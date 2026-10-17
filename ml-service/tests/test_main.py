import pytest
from fastapi.testclient import TestClient

from app.errors import UnsupportedTask
from app.main import app
from app.models.base import ModelAdapter, ModelInfo
from app.models.registry import ModelRegistry

client = TestClient(app)


class DummyAdapter(ModelAdapter):
    def info(self):
        return ModelInfo(id="dummy", name="Dummy", checkpoint="none", tasks=[], modalities=[], licence="n/a")

    def check_availability(self):
        return False, "weights not downloaded"

    def load(self):
        pass

    def unload(self):
        pass


def test_health_reports_service_state():
    r = client.get("/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"
    assert body["service"] == "orbit-ml"
    assert body["models_registered"] == 0


def test_models_list_is_empty_until_adapters_are_registered():
    assert client.get("/models").json() == {"items": []}


def test_unknown_model_returns_structured_404():
    r = client.get("/models/nope")
    assert r.status_code == 404
    assert r.json()["error"]["code"] == "http_error"


def test_registry_reports_unavailable_models_honestly():
    reg = ModelRegistry()
    reg.register(DummyAdapter())
    item = reg.list()[0]
    assert item["available"] is False
    assert item["unavailable_reason"] == "weights not downloaded"


def test_registry_rejects_duplicate_ids():
    reg = ModelRegistry()
    reg.register(DummyAdapter())
    with pytest.raises(ValueError):
        reg.register(DummyAdapter())


def test_unsupported_tasks_raise_instead_of_fabricating_output():
    with pytest.raises(UnsupportedTask):
        DummyAdapter().caption("x.png")
