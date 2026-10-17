import importlib.util
import platform

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.models.registry import registry

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
