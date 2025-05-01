import os
import redis
import json
from typing import Optional, List, Any
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file


class RedisClient:
    def __init__(self):
        self.redis = redis.Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
            db=int(os.getenv("REDIS_DB", 0)),
            password=os.getenv("REDIS_PASSWORD", None),
            decode_responses=True,
        )
        self.prefix = "sensor:"

    def _full_key(self, key: str) -> str:
        return f"{self.prefix}{key}"

    def set_sensor_data(self, sensor_name: str, value: float) -> bool:
        """Set individual sensor data."""
        return self._set(self._full_key(sensor_name), value)

    def get_sensor_data(self, sensor_name: str) -> Optional[float]:
        """Get individual sensor data."""
        try:
            value = self.redis.get(self._full_key(sensor_name))
            return float(value) if value is not None else None
        except (redis.RedisError, ValueError) as e:
            print(f"[Redis Error] get_sensor_data({sensor_name}): {e}")
            return None

    def _set(self, key: str, value: Any) -> bool:
        try:
            self.redis.set(key, json.dumps(value))
            return True
        except redis.RedisError as e:
            print(f"[Redis Error] set({key}): {e}")
            return False

    def set(self, key: str, value: Any) -> bool:
        """Set any data as JSON-encoded value."""
        return self._set(key, value)

    def get(self, key: str) -> Optional[Any]:
        """Retrieve JSON-decoded data by key."""
        try:
            value = self.redis.get(key)
            return json.loads(value) if value else None
        except (redis.RedisError, ValueError) as e:
            print(f"[Redis Error] get({key}): {e}")
            return None

    def set_all_sensors(self, data: dict[str, float]) -> bool:
        """Set multiple sensor values at once using pipeline."""
        try:
            with self.redis.pipeline() as pipe:
                for key, value in data.items():
                    pipe.set(self._full_key(key), value)
                pipe.execute()
            return True
        except redis.RedisError as e:
            print(f"[Redis Error] set_all_sensors: {e}")
            return False

    def get_all_sensors(self, keys: List[str] = None) -> dict[str, Optional[float]]:
        """Retrieve multiple sensor readings."""
        keys = keys or ["ph", "turbidity", "water_temperature", "water_oxygen_level"]
        return {key: self.get_sensor_data(key) for key in keys}

    def append_to_list(self, key: str, value: float, max_length: int) -> bool:
        """Append to a Redis list and trim it to max_length."""
        try:
            self.redis.rpush(key, json.dumps(value))
            self.redis.ltrim(key, -max_length, -1)
            return True
        except redis.RedisError as e:
            print(f"[Redis Error] append_to_list({key}): {e}")
            return False

    def get_all_from_list(self, key: str) -> List[float]:
        """Retrieve all values from a Redis list."""
        try:
            items = self.redis.lrange(key, 0, -1)
            return [json.loads(i) for i in items]
        except redis.RedisError as e:
            print(f"[Redis Error] get_all_from_list({key}): {e}")
            return []

    def get_latest_from_list(self, key: str) -> Optional[float]:
        """Retrieve the most recent item in a Redis list."""
        try:
            val = self.redis.lindex(key, -1)
            return float(val) if val is not None else None
        except (redis.RedisError, ValueError) as e:
            print(f"[Redis Error] get_latest_from_list({key}): {e}")
            return None

    def clear(self, key: str) -> bool:
        """Delete a key from Redis."""
        try:
            self.redis.delete(key)
            return True
        except redis.RedisError as e:
            print(f"[Redis Error] clear({key}): {e}")
            return False


redis_client = RedisClient()
