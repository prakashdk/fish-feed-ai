# app/models/sensor.py
from pydantic import BaseModel
from typing import Optional


class SensorData(BaseModel):
    ph: Optional[float]
    temperature: Optional[float]
    rain: Optional[float]
    oxygen_level: Optional[float]
    turbidity: Optional[float]
    tds: Optional[float]

    class Config:
        # This makes it easier to accept the input as JSON and validate it
        from_attributes = True
