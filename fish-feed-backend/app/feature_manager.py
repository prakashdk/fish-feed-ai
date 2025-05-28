from sklearn.preprocessing import MinMaxScaler
from dataclasses import dataclass, asdict
from app.dto.feed_input_feature_dto import FeedInputFeaturesDto
from app.dto.raw_feed_factors_dto import RawFeedFactorsDto
from app.dto.raw_feed_factors_dto import RawFeedFactorsDto
from app.sensors import WaterQualitySensor
from app.configs.mongo_engine_connection import mongo_connect, mongo_disconnect
from datetime import datetime, timezone
from typing import Tuple
from app.utils.scaling_utils import scale_features
import math
from app.repositories.feed_session_repository import FeedSessionRepository
from app.configs.postgre import get_db


@dataclass
class PollutionFactors:
    ph: float
    turbidity: float
    tds: float


class FeatureManager:
    def __init__(
        self,
        factor_ranges: dict[str, tuple[float, float]],
        factor_weights: dict[str, float] | None = None,
    ):
        self.factor_ranges = factor_ranges
        self.factor_weights = factor_weights
        self.__compute_since_last_feed()
        self.water_sensor = WaterQualitySensor()

    def _get_pollution_level(self, factors: PollutionFactors) -> float:
        scaled = scale_features(
            asdict(factors), self.factor_ranges, self.factor_weights
        )
        # Calculate water pollution level as an average
        water_pollution_level = scaled.mean()

        print(f"Water Pollution Level: {water_pollution_level}")

        return round(water_pollution_level, 2)

    def __compute_since_last_feed(self) -> int:
        feed_session = FeedSessionRepository(get_db()).get_last_inserted()

        if feed_session is None or feed_session.feeded_at is None:
            return 1

        last_feeded_at = feed_session.feeded_at.replace(tzinfo=timezone.utc)

        now = datetime.now(timezone.utc)

        diff_seconds = abs((now - last_feeded_at).total_seconds())

        hour_diff = math.ceil(diff_seconds / 3600)

        return hour_diff

    def __get_raw_factors(self) -> RawFeedFactorsDto:
        return RawFeedFactorsDto(
            ph=self.water_sensor.get_ph(),
            turbidity=self.water_sensor.get_turbidity(),
            tds=self.water_sensor.get_tds(),
        )

    def get_feed_input_features(self) -> Tuple[FeedInputFeaturesDto, RawFeedFactorsDto]:
        raw_factors = self.__get_raw_factors()

        pollution_factors = PollutionFactors(
            ph=raw_factors.ph,
            turbidity=raw_factors.turbidity,
            tds=raw_factors.turbidity,
        )

        return (
            FeedInputFeaturesDto(
                water_temperature_c=self.water_sensor.get_water_temperature(),
                dissolved_oxygen_mg_l=self.water_sensor.get_water_oxygen_level(),
                time_since_last_feed_hr=self.__compute_since_last_feed(),
                water_pollution_level=self._get_pollution_level(pollution_factors),
                raining=self.water_sensor.get_rain_level(),
            ),
            raw_factors,
        )
