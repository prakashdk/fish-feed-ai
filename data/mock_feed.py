import time
import requests

BASE_API_URL = "http://localhost:5000/api"
FEED_API_URL = f"{BASE_API_URL}/feed"
ACTUAL_FEED_URL = f"{BASE_API_URL}/actual_feed"


def generate_mock_leftover_feed():
    return float(input("Enter leftover (kg): "))


def main():
    print("[INFO] Starting feed interaction loop...")
    try:
        f = "y"
        while f.lower() == "y":
            # Step 1: Get feed prediction
            response = requests.get(FEED_API_URL)
            if not response.ok:
                print(f"[ERROR] Failed to get feed data: {response.text}")
                time.sleep(3)
                continue

            feed_data = response.json()
            calculated_feed = feed_data.get("calculated_feed")
            predicted_feed = feed_data.get("predicted_feed")
            message = feed_data.get("predict_message", "")

            print(f"\n📦 Feed Recommendation")
            print(f"1. Calculated Feed: {calculated_feed} kg")
            print(f"2. Predicted Feed: {predicted_feed} kg")
            print(f"🔍 {message}")

            # Step 2: Select actual feed
            option = input(
                "Choose option: [1] Calculated  [2] Predicted  [3] Custom: "
            ).strip()
            if option == "1":
                actual_feed = calculated_feed
            elif option == "2":
                actual_feed = predicted_feed
            elif option == "3":
                actual_feed = float(input("Enter actual feed (kg): "))
            else:
                print("Invalid input. Try again.\n")
                continue

            # Step 3: Send actual feed to system
            res = requests.put(ACTUAL_FEED_URL, json={"actual_feed": actual_feed})
            if not res.ok:
                print(f"[ERROR] Failed to set actual feed: {res.text}")
                continue

            # Step 4: Send leftover
            leftover = generate_mock_leftover_feed()
            res = requests.post(FEED_API_URL, json={"left_over": leftover})
            if res.ok:
                print(f"[✔️] Posted leftover: {leftover} kg")
            else:
                print(f"[ERROR] Failed to send leftover: {res.text}")

            f = input("Next session [y]: ")

    except KeyboardInterrupt:
        print("\n[INFO] Stopped by user.")


if __name__ == "__main__":
    main()
