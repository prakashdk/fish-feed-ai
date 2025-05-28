FISH_COUNT = 100
FISH_AVG_WEIGHT_G = 10

FEATURE_RANGES = {
    "water_temperature_c": (15, 30),
    "dissolved_oxygen_mg_l": (2, 10),
    "time_since_last_feed_hr": (1, 12),
    "water_pollution_level": (0, 1),  # Derived feature
    "raining": (0, 1),
}

FACTOR_RANGES = {
    "ph": (5.0, 10.0),
    "turbidity": (5, 800),
    "tds": (100, 3000),
}


FEATURE_WEIGHTS = {
    "water_temperature_c": 0.25,
    "dissolved_oxygen_mg_l": 0.22,
    "time_since_last_feed_hr": 0.13,
    "water_pollution_level": 0.20,
    "raining": 0.10,
}
FACTOR_WEIGHTS = {
    "ph": 0.25,
    "turbidity": 0.25,
    "tds": 0.5,
}

MODEL_PATH = "models/fish_feed_model.pkl"
