import time
import random
import requests

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

API_URL = "http://localhost:5000/api/sensor/update"  # Update if running elsewhere


def generate_mock_sensor_data():
    return {
        "ph": round(random.uniform(*FACTOR_RANGES["ph"]), 2),
        "temperature": round(random.uniform(*FEATURE_RANGES["water_temperature_c"]), 2),
        "rain": round(random.uniform(0, 1000)),
        "oxygen_level": round(
            random.uniform(*FEATURE_RANGES["dissolved_oxygen_mg_l"]), 2
        ),
        "turbidity": round(random.uniform(*FACTOR_RANGES["turbidity"]), 2),
        "tds": round(random.uniform(*FACTOR_RANGES["tds"]), 2),
    }


def main():
    print("[INFO] Starting mock sensor API publisher...")
    try:
        while True:
            data = generate_mock_sensor_data()
            response = requests.post(API_URL, json=data)
            print(
                f"[POSTED] {data} --> Status: {response.status_code}, Response: {response.json()}"
            )
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[INFO] Stopped by user.")


if __name__ == "__main__":
    main()
