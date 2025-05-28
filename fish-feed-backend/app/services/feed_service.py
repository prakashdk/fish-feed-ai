# app/services/feed_service.py
from datetime import datetime, timezone
from dataclasses import asdict, dataclass
from app.constants import (
    FISH_AVG_WEIGHT_G,
    FISH_COUNT,
    FEATURE_RANGES,
    FEATURE_WEIGHTS,
    MODEL_PATH,
    FACTOR_RANGES,
)
from app.feed_calculator import FishFeedCalculator
from app.feed_adjustment_model import FeedAdjustmentModel
from app.feed_manager import FeedManager
from app.feature_manager import FeatureManager
from app.dto.feed_session_dto import FeedSessionDto
from app.configs.redis_client import redis_client
from app.utils.redis_utils import get_float, get_json
import numpy as np
from typing import Dict
from app.repositories.feed_session_repository import FeedSessionRepository
from app.configs.postgre import get_db


@dataclass
class FeedData:
    calculated_feed: float
    predicted_feed: float
    predict_message: str


model = FeedAdjustmentModel(model_path=MODEL_PATH)
manager = FeedManager(
    fish_avg_weight_g=FISH_AVG_WEIGHT_G, fish_count=FISH_COUNT, model=model
)
scaler = FishFeedCalculator(
    feature_ranges=FEATURE_RANGES, feature_weights=FEATURE_WEIGHTS
)


def get_feed() -> dict:
    feature_manager = FeatureManager(FACTOR_RANGES)
    features, raw_factors = feature_manager.get_feed_input_features()
    scaled = scaler.scale_features(asdict(features)).reshape(1, -1)

    baseline_feed, final_feed, adjustment = manager.run(scaled)
    adjust_message = _get_feed_change_message(baseline_feed, final_feed)

    # Persist process data
    redis_client.set(
        "process:data",
        {
            "raw_factors": asdict(raw_factors),
            "baseline_feed": baseline_feed,
            "final_feed": final_feed,
            "adjustment": adjustment,
            "features": asdict(features),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        },
    )
    redis_client.set("process:scaled", scaled.tolist())

    return asdict(
        FeedData(
            calculated_feed=baseline_feed,
            predicted_feed=final_feed,
            predict_message=adjust_message,
        )
    )


def feed(left_over: float) -> dict:
    actual_feed = get_float("process:actual_feed")
    dumped_data = get_json("process:data")
    actual_adjustment_factor = left_over / actual_feed

    scaled = np.array(redis_client.get("process:scaled"))

    # Retrain model
    manager.retrain(scaled, actual_adjustment_factor)

    manager.update_raw_features(
        FeedSessionDto(
            features=dumped_data["features"],
            other_factors=dumped_data["raw_factors"],
            baseline_feed=float(dumped_data["baseline_feed"]),
            adjustment_factor=float(dumped_data["adjustment"]),
            final_feed=float(dumped_data["final_feed"]),
            actual_feed=actual_feed,
            leftover_feed=left_over,
            actual_adjustment_factor=actual_adjustment_factor,
            feeded_at=datetime.now(timezone.utc),
        )
    )

    return {"status": "training_updated"}


def _get_feed_change_message(calculated_feed: float, predicted_feed: float) -> str:
    if predicted_feed == 0:
        return "Predicted feed is zero, cannot calculate percentage change."

    diff = calculated_feed - predicted_feed
    percent_change = (diff / predicted_feed) * 100

    if percent_change < 0:
        return f"Increased by {round(percent_change, 2)}%"
    elif percent_change > 0:
        return f"Decreased by {round(abs(percent_change), 2)}%"
    return "No change"


def export_feed_session(include_all: bool = True):
    """Export all FeedSession documents to a CSV file."""

    feed_sessions = FeedSessionRepository(get_db()).retrieve_all()

    # Prepare a list of dictionaries for CSV export
    feed_sessions_data = []
    for session in feed_sessions:
        features = dict(session.features or {})
        other_factors = dict(session.other_factors or {})

        data: Dict[str, float | datetime | None] = {
            "water_temperature_c": features.get("water_temperature_c"),
            "dissolved_oxygen_mg_l": features.get("dissolved_oxygen_mg_l"),
            "time_since_last_feed_hr": features.get("time_since_last_feed_hr"),
            "water_pollution_level": features.get("water_pollution_level"),
            "raining": features.get("raining"),
            "predicted_feed": float(session.final_feed),
            "actual_feed": float(session.actual_feed),
            "baseline_feed": float(session.baseline_feed),
        }

        if include_all:
            data["adjustment_factor"] = float(session.adjustment_factor)
            data["ph"] = other_factors.get("ph")
            data["turbidity"] = other_factors.get("turbidity")
            data["tds"] = other_factors.get("tds")
            data["leftover_feed"] = float(session.leftover_feed)
            data["actual_adjustment_factor"] = float(session.actual_adjustment_factor)
            data["feeded_at"] = getattr(session, "feeded_at")
            data["created_at"] = getattr(session, "created_at")

        feed_sessions_data.append(data)

    return feed_sessions_data
