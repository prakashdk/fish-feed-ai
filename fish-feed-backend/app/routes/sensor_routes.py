from fastapi import APIRouter, HTTPException
from app.sensors import WaterQualitySensor
from app.utils.socket_connection_manager import socket_manager
from app.models.sensor import SensorData
from uuid import UUID

sensor_router = APIRouter()
sensor = WaterQualitySensor()


@sensor_router.post("/{device_id}/pond-monitor")
async def update_sensor_data(device_id: UUID, data: SensorData):
    """Update sensor data and broadcast the new values."""
    try:
        if data.ph is not None:
            sensor.set_ph(data.ph)
        if data.turbidity is not None:
            sensor.set_turbidity(data.turbidity)
        if data.oxygen_level is not None:
            sensor.set_water_oxygen_level(data.oxygen_level)
        if data.temperature is not None:
            sensor.set_water_temperature(data.temperature)
        if data.rain is not None:
            sensor.set_rain_level(data.rain)
        if data.tds is not None:
            sensor.set_tds(data.tds)

        message = {data: data.model_dump(), device_id: device_id}

        # Broadcast the data using the socket manager
        await socket_manager.broadcast(
            message
        )  # .dict() converts Pydantic model to dict

        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
