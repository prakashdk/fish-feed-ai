# app/utils/redis_utils.py
import json
from typing import Any, Dict, Optional
from app.configs.redis_client import redis_client


def get_str(key: str) -> Optional[str]:
    value = redis_client.get(key)
    return value.decode("utf-8") if value else None


def get_float(key: str) -> float:
    value = redis_client.get(key)
    if value is None:
        raise ValueError(f"Missing key in Redis: {key}")
    return float(value)


def get_json(key: str) -> Dict[str, Any]:
    value = redis_client.get(key)
    if value is None:
        raise ValueError(f"Missing JSON key in Redis: {key}")
    return value


def set_json(key: str, value: dict) -> None:
    redis_client.set(key, json.dumps(value))


def set_float(key: str, value: float) -> None:
    redis_client.set(key, str(value))
