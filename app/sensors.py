from collections import deque
import time
from app.configs.redis_client import redis_client
from typing import List


class WaterQualitySensor:

    def __init__(self):
        self.redis = redis_client
        self.rain_window = 60

    # pH
    def set_ph(self, value: float):
        return self.redis.set_sensor_data("ph", value)

    def get_ph(self) -> float:
        value = self.redis.get_sensor_data("ph")
        if not value:
            raise Exception("No pH data available")
        return value

    # Turbidity
    def set_turbidity(self, value: float):
        return self.redis.set_sensor_data("turbidity", value)

    def get_turbidity(self) -> float:
        value = self.redis.get_sensor_data("turbidity")
        if not value:
            raise Exception("No turbidity data available")
        return value

    # TDS
    def set_tds(self, value: float):
        return self.redis.set_sensor_data("tds", value)

    def get_tds(self) -> float:
        value = self.redis.get_sensor_data("tds")
        if not value:
            raise Exception("No TDS data available")
        return value

    # Water Temperature
    def set_water_temperature(self, value: float):
        return self.redis.set_sensor_data("temperature", value)

    def get_water_temperature(self) -> float:
        value = self.redis.get_sensor_data("temperature")
        if not value:
            raise Exception("No water temperature data available")
        return value

    # Water Oxygen Level
    def set_water_oxygen_level(self, value: float):
        return self.redis.set_sensor_data("oxygen", value)

    def get_water_oxygen_level(self) -> float:
        value = self.redis.get_sensor_data("oxygen")
        if not value:
            raise Exception("No oxygen level data available")
        return value

    # Water Oxygen Level
    def set_rain_level(self, value: float):
        return self.redis.append_to_list("sensor:rain", value, self.rain_window)

    def get_rain_level(self) -> float:
        rain_data = self.redis.get_all_from_list("sensor:rain")

        if not rain_data:
            raise Exception("No rain_data data available")

        return self.__compute_rain_level(rain_data)

    def __compute_rain_level(self, rain: List[float]):
        if not rain:
            return 0.0

        # Average analog value over the window
        avg = sum(val for val in rain) / len(rain)

        # Classify based on avg value
        if avg > 800:
            return 0.0
        elif avg > 600:
            return 0.25
        elif avg > 400:
            return 0.5
        elif avg > 200:
            return 0.75
        else:
            return 1.0
