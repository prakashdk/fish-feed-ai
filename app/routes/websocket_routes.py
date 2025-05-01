# websocket_routes.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
from app.utils.socket_connection_manager import socket_manager

ws_router = APIRouter()


@ws_router.websocket("/ws/sensor")
async def websocket_endpoint(websocket: WebSocket):
    await socket_manager.connect(websocket)
    try:
        while True:
            # Keep connection alive, no need to read messages
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        socket_manager.disconnect(websocket)
