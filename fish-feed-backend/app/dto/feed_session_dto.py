from dataclasses import dataclass
from typing import Dict, Optional
from .feed_input_feature_dto import FeedInputFeaturesDto
from .raw_feed_factors_dto import RawFeedFactorsDto
from datetime import datetime


@dataclass
class FeedSessionDto:
    features: FeedInputFeaturesDto
    other_factors: RawFeedFactorsDto
    baseline_feed: float
    adjustment_factor: float
    final_feed: float
    feeded_at: datetime
    actual_feed: Optional[float] = None
    leftover_feed: Optional[float] = None
    actual_adjustment_factor: Optional[float] = None
    created_at: Optional[datetime] = None
