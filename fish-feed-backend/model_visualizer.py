import matplotlib.pyplot as plt
import joblib
from app.constants import FEATURE_RANGES, MODEL_PATH

features = FEATURE_RANGES.keys()

model = joblib.load(MODEL_PATH)

weights = model.coef_

# Extract and print model coefficients
print("\n📊 Model Coefficients (Weights for each feature):")
for name, coef in zip(features, model.coef_):
    print(f"{name:30}: {coef:.4f}")

# Print model intercept (bias)
print(f"\n⚙️ Model Intercept (Bias): {model.intercept_[0]:.4f}")


plt.figure(figsize=(8, 4))
plt.barh(features, weights)
plt.xlabel("Weight (Coefficient)")
plt.title("Feature Importance in Feed Adjustment Model")
plt.grid(True)
plt.tight_layout()
plt.show()
