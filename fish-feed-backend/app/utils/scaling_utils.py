from sklearn.preprocessing import MinMaxScaler
import numpy as np


def scale_features(
    features: dict, feature_ranges: dict, feature_weights: dict | None = None
) -> np.ndarray:
    """
    Scales features using MinMaxScaler based on provided min-max ranges,
    and optionally applies weights to each scaled feature.

    Args:
        features (dict): Feature values {feature_name: value}.
        feature_ranges (dict): Feature ranges {feature_name: (min, max)}.
        feature_weights (dict, optional): Feature weights {feature_name: weight}.

    Returns:
        np.ndarray: Scaled (and optionally weighted) feature values as a 1D array.
    """
    feature_keys = list(feature_ranges.keys())

    # Validate presence of required keys
    missing = [key for key in feature_keys if key not in features]
    if missing:
        raise ValueError(f"Missing features: {', '.join(missing)}")

    # Prepare ordered arrays
    values = [features[key] for key in feature_keys]
    mins = [feature_ranges[key][0] for key in feature_keys]
    maxs = [feature_ranges[key][1] for key in feature_keys]

    # Fit scaler to feature bounds
    scaler = MinMaxScaler()
    scaler.fit([mins, maxs])
    scaled = scaler.transform([values])[0]  # 1D array

    # Apply weights if provided
    if feature_weights:
        weights = np.array([feature_weights.get(key, 1.0) for key in feature_keys])
        scaled *= weights

    return scaled
