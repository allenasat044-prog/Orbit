import types

import numpy as np
import pytest
from fastapi.testclient import TestClient
from PIL import Image

from app.errors import ModelError, ModelUnavailable, UnsupportedTask
from app.main import app, registry
from app.models.base import ModelAdapter, ModelInfo
from app.models.candidates import earthgpt, mtrs_change_captioner, skysensegpt, terrascope
from app.models.georsclip import DEFAULT_LABELS, GeoRSCLIPAdapter, PROMPT_TEMPLATE
from app.models.rs_llava import RSLlavaAdapter
from app.models.smolvlm import CHECKPOINT, DEFAULT_PROMPT, SmolVLMAdapter, dtype_kwarg, pick_dtype, resolve_model_class

client = TestClient(app)


class FakeInputs(dict):
    def to(self, device):
        self.device = device
        return self


class FakeProcessor:
    def __init__(self, text="  A green field with a road.  "):
        self.text = text

    def apply_chat_template(self, messages, add_generation_prompt):
        self.messages = messages
        return "<chat>"

    def __call__(self, text, images, return_tensors):
        self.call = (text, images)
        return FakeInputs(input_ids=np.zeros((1, 7), dtype=int))

    def batch_decode(self, ids, skip_special_tokens):
        self.decoded = ids
        return [self.text]


class FakeModel:
    config = types.SimpleNamespace(_commit_hash="abc123")

    def generate(self, **kwargs):
        self.kwargs = kwargs
        return np.arange(12).reshape(1, 12)


def adapter(text="  A green field with a road.  "):
    proc, model = FakeProcessor(text), FakeModel()
    calls = []

    def loader():
        calls.append(1)
        return proc, model, "cpu", "float32"

    return SmolVLMAdapter(loader=loader), proc, model, calls


@pytest.fixture
def png(tmp_path):
    p = tmp_path / "chip.png"
    Image.fromarray(np.full((128, 128, 3), 90, np.uint8)).save(p)
    return p


def test_caption_decodes_only_new_tokens_and_records_provenance(png):
    a, proc, model, _ = adapter()
    r = a.caption(str(png))
    assert r["text"] == "A green field with a road."
    assert proc.decoded.shape == (1, 5)
    assert r["model_id"] == "smolvlm-instruct" and r["checkpoint"] == CHECKPOINT
    assert r["revision"] == "abc123" and r["device"] == "cpu" and r["dtype"] == "float32"
    assert r["prompt"] == DEFAULT_PROMPT and r["latency_ms"] >= 0
    assert model.kwargs["do_sample"] is False
    assert proc.call[1][0].mode == "RGB"


def test_default_prompt_asks_for_visible_evidence_only():
    for phrase in ("Sentinel-2", "10 metres per pixel", "Do not name places", "count objects", "say so"):
        assert phrase in DEFAULT_PROMPT


def test_custom_prompt_is_passed_through(png):
    a, proc, _, _ = adapter()
    r = a.caption(str(png), prompt="What crops are visible?")
    assert r["prompt"] == "What crops are visible?"
    assert proc.messages[0]["content"][1]["text"] == "What crops are visible?"


def test_model_loads_lazily_once_and_can_be_unloaded(png):
    a, _, _, calls = adapter()
    assert calls == [] and a.info().loaded is False
    a.caption(str(png))
    a.caption(str(png))
    assert len(calls) == 1 and a.info().loaded is True and a.info().resources["device"] == "cpu"
    a.unload()
    assert a.info().loaded is False


def test_empty_model_output_is_an_error_not_a_blank_caption(png):
    a, *_ = adapter(text="   ")
    with pytest.raises(ModelError):
        a.caption(str(png))


def test_unreadable_and_tiny_images_are_rejected(tmp_path):
    a, *_ = adapter()
    bad = tmp_path / "x.png"
    bad.write_text("not an image")
    with pytest.raises(UnsupportedTask):
        a.validate_input(str(bad))
    tiny = tmp_path / "t.png"
    Image.fromarray(np.zeros((8, 8, 3), np.uint8)).save(tiny)
    with pytest.raises(UnsupportedTask):
        a.validate_input(str(tiny))


def test_availability_names_the_missing_packages(monkeypatch):
    import importlib.util as iu

    real = iu.find_spec
    monkeypatch.setattr(iu, "find_spec", lambda n, *a, **k: None if n == "torch" else real(n, *a, **k))
    ok, reason = SmolVLMAdapter().check_availability()
    assert ok is False and "torch" in reason and "requirements-ml.txt" in reason
    with pytest.raises(ModelUnavailable):
        SmolVLMAdapter().load()


def test_loader_failures_become_model_unavailable_with_the_cause(png):
    def boom():
        raise OSError("network down")

    with pytest.raises(ModelUnavailable, match="network down"):
        SmolVLMAdapter(loader=boom).caption(str(png))


def test_rs_llava_is_registered_but_honestly_unavailable(png):
    a = RSLlavaAdapter()
    ok, reason = a.check_availability()
    assert ok is False and "CUDA" in reason
    with pytest.raises(ModelUnavailable):
        a.caption(str(png))
    info = a.info()
    assert info.id == "rs-llava-7b" and "neural-chat" in info.checkpoint


# ---------- HTTP API ----------
class Stub(ModelAdapter):
    def __init__(self, mid, tasks=("caption",), available=True):
        self.mid, self.tasks, self.available = mid, list(tasks), available

    def info(self):
        return ModelInfo(id=self.mid, name=self.mid, checkpoint="stub", tasks=self.tasks, modalities=[], licence="n/a")

    def check_availability(self):
        return (True, None) if self.available else (False, "weights missing")

    def load(self):
        pass

    def unload(self):
        pass

    def caption(self, image_path, prompt=None, **kw):
        return {"text": f"stub caption ({prompt})", "model_id": self.mid, "checkpoint": "stub", "prompt": prompt, "latency_ms": 1}


@pytest.fixture
def stubs(tmp_path, monkeypatch):
    monkeypatch.setenv("STORAGE_DIR", str(tmp_path))
    Image.fromarray(np.full((64, 64, 3), 9, np.uint8)).save(tmp_path / "c.png")
    registry.register(Stub("stub-ok"))
    registry.register(Stub("stub-down", available=False))
    registry.register(Stub("stub-vqa", tasks=("vqa",)))
    yield
    for m in ("stub-ok", "stub-down", "stub-vqa"):
        registry.unregister(m)


def test_models_endpoint_lists_defaults_with_availability():
    items = {m["id"]: m for m in client.get("/models").json()["items"]}
    assert {"smolvlm-instruct", "rs-llava-7b"} <= set(items)
    assert items["rs-llava-7b"]["available"] is False
    assert items["rs-llava-7b"]["unavailable_reason"]
    assert client.get("/models/rs-llava-7b").json()["id"] == "rs-llava-7b"


def test_caption_endpoint_returns_the_model_result(stubs):
    r = client.post("/caption", json={"model_id": "stub-ok", "image_path": "c.png", "prompt": "hi"})
    assert r.status_code == 200 and r.json()["text"] == "stub caption (hi)"


def test_caption_endpoint_errors_are_structured(stubs):
    def code(body):
        r = client.post("/caption", json=body)
        return r.status_code, r.json()["error"]["code"]

    assert code({"model_id": "nope", "image_path": "c.png"}) == (404, "unknown_model")
    assert code({"model_id": "stub-down", "image_path": "c.png"}) == (503, "model_unavailable")
    assert code({"model_id": "stub-vqa", "image_path": "c.png"}) == (422, "unsupported_task")
    assert code({"model_id": "stub-ok", "image_path": "missing.png"}) == (404, "image_not_found")
    assert code({"model_id": "stub-ok", "image_path": "../../etc/passwd"}) == (400, "invalid_path")
    r = client.post("/caption", json={"model_id": "rs-llava-7b", "image_path": "c.png"})
    assert r.status_code == 503 and "CUDA" in r.json()["error"]["message"]


def test_default_model_without_packages_reports_unavailable(stubs, monkeypatch):
    import importlib.util as iu

    real = iu.find_spec
    monkeypatch.setattr(iu, "find_spec", lambda n, *a, **k: None if n == "torch" else real(n, *a, **k))
    r = client.post("/caption", json={"image_path": "c.png"})
    assert r.status_code == 503 and "torch" in r.json()["error"]["message"]


def test_model_class_works_with_old_and_new_transformers():
    new = types.SimpleNamespace(AutoModelForImageTextToText="new")
    old = types.SimpleNamespace(AutoModelForVision2Seq="old")
    both = types.SimpleNamespace(AutoModelForImageTextToText="new", AutoModelForVision2Seq="old")
    assert resolve_model_class(new) == "new"
    assert resolve_model_class(old) == "old"
    assert resolve_model_class(both) == "new"
    with pytest.raises(ModelUnavailable, match="pip install -U transformers"):
        resolve_model_class(types.SimpleNamespace())


def test_dtype_argument_name_follows_the_transformers_version():
    assert dtype_kwarg("4.46.3") == "torch_dtype"
    assert dtype_kwarg("4.55.9") == "torch_dtype"
    assert dtype_kwarg("4.56.0") == "dtype"
    assert dtype_kwarg("5.20.1") == "dtype"
    assert dtype_kwarg("weird") == "dtype"


def test_dtype_can_be_overridden_and_bad_values_are_explained(monkeypatch):
    torch = types.SimpleNamespace(float16="f16", bfloat16="bf16", float32="f32")
    assert pick_dtype(torch, "mps") == "bf16"
    assert pick_dtype(torch, "cpu") == "f32"
    monkeypatch.setenv("ORBIT_DTYPE", "float16")
    assert pick_dtype(torch, "mps") == "f16"
    monkeypatch.setenv("ORBIT_DTYPE", "int4")
    with pytest.raises(ModelUnavailable, match="ORBIT_DTYPE"):
        pick_dtype(torch, "mps")


def test_research_candidates_are_registered_with_their_verified_facts_and_never_pretend_to_run(png):
    for make, mid, needle in [(earthgpt, "earthgpt", "only a README"), (skysensegpt, "skysensegpt", "no public weights"), (terrascope, "terrascope-8b", "16 GB")]:
        a = make()
        ok, reason = a.check_availability()
        assert ok is False and needle in reason
        with pytest.raises(ModelUnavailable):
            a.caption(str(png))
        with pytest.raises(ModelUnavailable):
            a.load()
        info = a.info()
        assert info.id == mid and info.resources["verified_on"] and info.resources["repo"].startswith("https://")


def test_models_endpoint_lists_every_candidate_as_unavailable_with_a_reason():
    items = {m["id"]: m for m in client.get("/models").json()["items"]}
    for mid in ("rs-llava-7b", "earthgpt", "skysensegpt", "terrascope-8b"):
        assert items[mid]["available"] is False and items[mid]["unavailable_reason"]
    assert items["terrascope-8b"]["modalities"] == ["optical", "sar"]
    assert "pixel-grounded-reasoning" in items["terrascope-8b"]["tasks"]
    r = client.post("/caption", json={"model_id": "earthgpt", "image_path": "whatever.png"})
    assert r.status_code == 422 or r.status_code == 503


# ---------- GeoRSCLIP ----------
def clip_adapter(image_vec=(1.0, 0.0, 0.0)):
    texts_seen = []

    def encode_text(texts):
        texts_seen.append(list(texts))
        out = []
        for t in texts:
            if "forest" in t:
                out.append([0.9, 0.1, 0.0])
            elif "water body" in t:
                out.append([0.0, 1.0, 0.0])
            elif "green fields and a road" in t:
                out.append([0.8, 0.2, 0.1])
            else:
                out.append([0.0, 0.1, 1.0])
        return np.array(out, dtype=np.float32)

    bundle = {"encode_image": lambda im: np.array([image_vec], dtype=np.float32), "encode_text": encode_text, "logit_scale": 100.0, "device": "cpu", "dtype": "float32", "load_info": {"missing_keys": 0, "unexpected_keys": 2}}
    calls = []
    a = GeoRSCLIPAdapter(loader=lambda: (calls.append(1), bundle)[1])
    return a, texts_seen, calls


def test_classify_ranks_default_labels_by_similarity_and_reports_provenance(png):
    a, seen, calls = clip_adapter()
    r = a.classify(str(png), top_k=3)
    assert r["labels"][0]["label"] == "forest"
    assert len(r["labels"]) == 3
    assert r["labels"][0]["score"] > r["labels"][1]["score"]
    assert 0 < sum(x["score"] for x in r["labels"]) <= 1.0001
    assert r["label_set"] == "default" and r["prompt_template"] == PROMPT_TEMPLATE
    assert (r["model_id"], r["device"], r["dtype"]) == ("georsclip-vit-b-32", "cpu", "float32")
    assert r["load_info"] == {"missing_keys": 0, "unexpected_keys": 2}
    assert seen[0] == [PROMPT_TEMPLATE.format(n) for n in DEFAULT_LABELS]
    assert len(calls) == 1


def test_classify_accepts_custom_labels_and_caches_text_embeddings(png):
    a, seen, _ = clip_adapter(image_vec=(0.0, 1.0, 0.0))
    r1 = a.classify(str(png), labels=["water body", "forest"], top_k=2)
    r2 = a.classify(str(png), labels=["water body", "forest"], top_k=1)
    assert r1["labels"][0]["label"] == "water body" and r1["label_set"] == "custom"
    assert len(r2["labels"]) == 1
    assert len(seen) == 1


def test_score_gives_cosine_similarity_per_text(png):
    a, _, _ = clip_adapter()
    r = a.score(str(png), ["green fields and a road", "water body"])
    s = {x["text"]: x["similarity"] for x in r["scores"]}
    assert s["green fields and a road"] > 0.9 and abs(s["water body"]) < 0.01
    assert all(-1.0 <= v <= 1.0 for v in s.values())


def test_embed_requires_exactly_one_input_and_returns_unit_vectors(png):
    a, _, _ = clip_adapter()
    v = a.embed(image_path=str(png))
    assert abs(sum(x * x for x in v) - 1.0) < 1e-5
    t = a.embed(text="forest")
    assert abs(sum(x * x for x in t) - 1.0) < 1e-5
    with pytest.raises(UnsupportedTask):
        a.embed()
    with pytest.raises(UnsupportedTask):
        a.embed(image_path=str(png), text="x")


def test_georsclip_availability_load_failures_and_bad_images(png, tmp_path, monkeypatch):
    import importlib.util as iu

    real = iu.find_spec
    monkeypatch.setattr(iu, "find_spec", lambda n, *a, **k: None if n == "open_clip" else real(n, *a, **k))
    ok, reason = GeoRSCLIPAdapter().check_availability()
    assert ok is False and "open_clip_torch" in reason and "requirements-ml.txt" in reason

    def boom():
        raise OSError("offline")

    with pytest.raises(ModelUnavailable, match="offline"):
        GeoRSCLIPAdapter(loader=boom).classify(str(png))
    bad = tmp_path / "x.png"
    bad.write_text("nope")
    a, _, _ = clip_adapter()
    with pytest.raises(UnsupportedTask):
        a.classify(str(bad))


def test_mtrs_paper_is_registered_as_a_documented_unavailable_candidate(png):
    a = mtrs_change_captioner()
    ok, reason = a.check_availability()
    assert ok is False and "24B" in reason and "no code or weights link" in reason
    info = a.info()
    assert info.id == "mtrs-mvlt-lora-cc" and info.tasks == ["change-caption"]
    assert info.resources["paper"] == "https://doi.org/10.3390/rs18010166"


@pytest.fixture
def clip_registered(stubs):
    a, _, _ = clip_adapter()
    registry.unregister("georsclip-vit-b-32")
    registry.register(a)
    yield
    registry.unregister("georsclip-vit-b-32")
    from app.models.georsclip import GeoRSCLIPAdapter as G
    registry.register(G())


def test_classify_and_score_endpoints_work_and_validate(clip_registered):
    r = client.post("/classify", json={"image_path": "c.png", "top_k": 2})
    assert r.status_code == 200 and r.json()["labels"][0]["label"] == "forest" and len(r.json()["labels"]) == 2
    r = client.post("/classify", json={"image_path": "c.png", "labels": ["water body", "forest"]})
    assert r.json()["labels"][0]["label"] in ("forest", "water body")
    r = client.post("/score", json={"image_path": "c.png", "texts": ["green fields and a road"]})
    assert r.status_code == 200 and r.json()["scores"][0]["similarity"] > 0.9
    codes = [
        client.post("/classify", json={"image_path": "c.png", "labels": ["only one"]}).status_code,
        client.post("/classify", json={"image_path": "c.png", "labels": ["a", " "]}).status_code,
        client.post("/classify", json={"image_path": "../../etc/passwd"}).status_code,
        client.post("/classify", json={"image_path": "missing.png"}).status_code,
        client.post("/score", json={"image_path": "c.png", "texts": []}).status_code,
        client.post("/score", json={"image_path": "c.png", "texts": ["x" * 2000]}).status_code,
        client.post("/classify", json={"image_path": "c.png", "model_id": "stub-ok"}).status_code,
        client.post("/classify", json={"image_path": "c.png", "model_id": "nope"}).status_code,
    ]
    assert codes == [422, 422, 400, 404, 422, 422, 422, 404]


def test_classify_without_packages_reports_unavailable(stubs, monkeypatch):
    import importlib.util as iu

    real = iu.find_spec
    monkeypatch.setattr(iu, "find_spec", lambda n, *a, **k: None if n == "open_clip" else real(n, *a, **k))
    r = client.post("/classify", json={"image_path": "c.png"})
    assert r.status_code == 503 and "open_clip_torch" in r.json()["error"]["message"]
