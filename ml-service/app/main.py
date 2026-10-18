from __future__ import annotations

import importlib.util
import platform

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.models.registry import registry
from app.raster import RasterError, extract_chip, raster_support, safe_path

VERSION = "0.1.0"

app = FastAPI(title="Orbit ML Service", version=VERSION)


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
    lon: float = Field(ge=-180, le=180)
    lat: float = Field(ge=-90, le=90)
    size_px: int = Field(default=512, ge=64, le=2048)


@app.exception_handler(RasterError)
async def raster_error(_: Request, exc: RasterError):
    return JSONResponse(status_code=exc.status, content={"error": {"code": exc.code, "message": exc.message}})


@app.post("/raster/chip")
def raster_chip(req: ChipRequest):
    return extract_chip(safe_path(req.path), safe_path(req.out_path), req.lon, req.lat, req.size_px)
