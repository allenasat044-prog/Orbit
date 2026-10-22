from __future__ import annotations

import importlib.util
import platform

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.errors import ModelError, ModelUnavailable, UnsupportedTask
from app.models.defaults import DEFAULT_CAPTION_MODEL, DEFAULT_MATCH_MODEL, register_defaults
from app.models.registry import registry
from app.raster import RasterError, extract_chip, raster_support, safe_path

VERSION = "0.1.0"

app = FastAPI(title="Orbit ML Service", version=VERSION)
register_defaults(registry)


@app.exception_handler(StarletteHTTPException)
async def http_error(_: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={"error": {"code": "http_error", "message": str(exc.detail)}})


@app.exception_handler(RequestValidationError)
async def validation_error(_: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": {"code": "validation_error", "message": "Invalid request", "details": exc.errors()}})


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "orbit-ml",
        "version": VERSION,
        "python": platform.python_version(),
        "torch_installed": importlib.util.find_spec("torch") is not None,
        "models_registered": len(registry),
        "raster": raster_support(),
    }


@app.get("/models")
def list_models():
    return {"items": registry.list()}


@app.get("/models/{model_id}")
def get_model(model_id: str):
    adapter = registry.get(model_id)
    if adapter is None:
        raise HTTPException(status_code=404, detail=f"Unknown model: {model_id}")
    return next(m for m in registry.list() if m["id"] == model_id)


class ChipRequest(BaseModel):
    path: str
    out_path: str
    display_out_path: str | None = None
    lon: float = Field(ge=-180, le=180)
    lat: float = Field(ge=-90, le=90)
    size_px: int = Field(default=512, ge=64, le=2048)


@app.exception_handler(RasterError)
async def raster_error(_: Request, exc: RasterError):
    return JSONResponse(status_code=exc.status, content={"error": {"code": exc.code, "message": exc.message}})


@app.post("/raster/chip")
def raster_chip(req: ChipRequest):
    display = safe_path(req.display_out_path) if req.display_out_path else None
    return extract_chip(safe_path(req.path), safe_path(req.out_path), req.lon, req.lat, req.size_px, display)


def _err(status: int, code: str, message: str) -> JSONResponse:
    return JSONResponse(status_code=status, content={"error": {"code": code, "message": message}})


@app.exception_handler(ModelUnavailable)
async def model_unavailable(_: Request, exc: ModelUnavailable):
    return _err(503, "model_unavailable", str(exc))


@app.exception_handler(UnsupportedTask)
async def unsupported_task(_: Request, exc: UnsupportedTask):
    return _err(422, "unsupported_input", str(exc))


@app.exception_handler(ModelError)
async def model_error(_: Request, exc: ModelError):
    return _err(500, "model_error", str(exc))


def _resolve(model_id: str, task: str):
    adapter = registry.get(model_id)
    if adapter is None:
        return None, _err(404, "unknown_model", f"Unknown model: {model_id}")
    if task not in adapter.info().tasks:
        return None, _err(422, "unsupported_task", f"{model_id} does not support {task}.")
    ok, reason = adapter.check_availability()
    if not ok:
        return None, _err(503, "model_unavailable", reason or "Model is not available.")
    return adapter, None


class CaptionRequest(BaseModel):
    image_path: str
    model_id: str | None = None
    prompt: str | None = Field(default=None, max_length=1000)


@app.post("/caption")
def caption(req: CaptionRequest):
    adapter, error = _resolve(req.model_id or DEFAULT_CAPTION_MODEL, "caption")
    if error:
        return error
    path = safe_path(req.image_path)
    if not path.exists():
        return _err(404, "image_not_found", "Image file does not exist.")
    return adapter.caption(str(path), prompt=req.prompt)


class ClassifyRequest(BaseModel):
    image_path: str
    model_id: str = DEFAULT_MATCH_MODEL
    labels: list[str] | None = Field(default=None, min_length=2, max_length=50)
    top_k: int = Field(default=5, ge=1, le=20)


@app.post("/classify")
def classify(req: ClassifyRequest):
    adapter, error = _resolve(req.model_id, "classify")
    if error:
        return error
    if req.labels and any(not (1 <= len(x.strip()) <= 80) for x in req.labels):
        return _err(422, "invalid_labels", "Each label must be 1 to 80 characters.")
    path = safe_path(req.image_path)
    if not path.exists():
        return _err(404, "image_not_found", "Image file does not exist.")
    return adapter.classify(str(path), labels=[x.strip() for x in req.labels] if req.labels else None, top_k=req.top_k)


class ScoreRequest(BaseModel):
    image_path: str
    texts: list[str] = Field(min_length=1, max_length=20)
    model_id: str = DEFAULT_MATCH_MODEL


@app.post("/score")
def score(req: ScoreRequest):
    adapter, error = _resolve(req.model_id, "score")
    if error:
        return error
    if any(not (1 <= len(x.strip()) <= 1000) for x in req.texts):
        return _err(422, "invalid_texts", "Each text must be 1 to 1000 characters.")
    path = safe_path(req.image_path)
    if not path.exists():
        return _err(404, "image_not_found", "Image file does not exist.")
    return adapter.score(str(path), [x.strip() for x in req.texts])
