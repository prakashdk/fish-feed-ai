import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from dotenv import load_dotenv

from app.routes.feed_routes import feed_router
from app.routes.sensor_routes import sensor_router
from app.routes.websocket_routes import ws_router
from app.routes.species_routes import species_router
from app.routes.pond_router import pond_router
from app.routes.organisation_routes import org_router
from app.routes.device_routes import device_router

load_dotenv()

# Create FastAPI app
app = FastAPI()


# Health check route
@app.get("/ping")
def ping():
    return {"status": "ok", "message": "pong"}


# Register API routers
app.include_router(sensor_router, prefix="/api/sensor", tags=["sensor"])
app.include_router(feed_router, prefix="/api", tags=["feed"])
app.include_router(species_router, prefix="/api/species", tags=["species"])
app.include_router(org_router, prefix="/api/org", tags=["organization"])
app.include_router(pond_router, prefix="/api", tags=["organization"])
app.include_router(device_router, prefix="/api/device", tags=["device"])
app.include_router(ws_router)

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("APP_PORT", 5000))
    uvicorn.run(app, port=port)
