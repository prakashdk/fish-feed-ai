from dataclasses import dataclass


@dataclass
class FeedInputFeaturesDto:
    water_temperature_c: float
    dissolved_oxygen_mg_l: float
    time_since_last_feed_hr: float
    water_pollution_level: float
    raining: float
