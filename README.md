# 🐟 Fish Feed AI

**Fish Feed AI** predicts the optimal feeding amount for aquaculture ponds using IoT sensor data and a lightweight machine learning model.

---

## 🚀 Overview
This project automates fish feeding by analyzing real-time environmental data such as temperature, dissolved oxygen, and leftover feed.  
It uses **`SGDRegressor`** from Scikit-learn for continuous learning, making it suitable for edge or low-resource deployments.

---

## 🧠 How It Works
1. IoT sensors collect data like temperature, oxygen, and leftover feed.  
2. The backend receives the data and passes it to the ML model.  
3. The model predicts how much feed to release.  
4. The result is sent to an automated feeder or accessible via API.

---

## 🛠️ Tech Stack
- **Python**, **FastAPI**, **Scikit-learn**, **Pandas**, **Docker**  
- **Model:** `SGDRegressor` (lightweight regression for streaming data)  
- **API:** REST endpoint for prediction  

---

## ▶️ Usage
