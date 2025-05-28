from sklearn.preprocessing import MinMaxScaler
import numpy as np
import app.utils.scaling_utils as ScalingUtils


class FishFeedCalculator:
    def __init__(self, feature_ranges, feature_weights):
        """
        Initializes the FishFeedCalculator with feature ranges and weights.

        Args:
            feature_ranges (dict): Dictionary containing feature names as keys and their respective min-max ranges.
            feature_weights (dict): Dictionary containing feature names as keys and their respective weights.
        """
        self.feature_ranges = feature_ranges
        self.feature_weights = feature_weights

    def scale_features(self, feature_dict):
        """
        Scales the given features based on predefined min and max values, then applies the corresponding weights.

        Args:
            feature_dict (dict): Dictionary containing feature names as keys and their respective values.

        Returns:
            np.ndarray: Scaled and weighted feature values.
        """

        weighted_scaled_values = ScalingUtils.scale_features(
            feature_dict, self.feature_ranges, self.feature_weights
        )

        return weighted_scaled_values

    def calculate_baseline_feed(
        self, avg_fish_weight_g, fish_count, feed_rate_percent=0.08
    ):
        """
        Calculates the baseline feed based on average fish weight, fish count, and the feed rate percentage.

        Args:
            avg_fish_weight_g (float): Average fish weight in grams.
            fish_count (int): The total number of fish.
            feed_rate_percent (float): Percentage of body weight for daily feed.

        Returns:
            float: Total baseline feed in kilograms.
        """
        # Validate input values
        if avg_fish_weight_g <= 0 or fish_count <= 0:
            raise ValueError(
                "Average fish weight and fish count must be greater than zero."
            )

        # Calculate the total biomass (in kg) and the baseline feed amount
        total_biomass = (
            avg_fish_weight_g * fish_count
        ) / 1000  # Convert grams to kilograms
        baseline_feed = total_biomass * feed_rate_percent  # In kilograms

        return baseline_feed
