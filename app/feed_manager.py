from typing import Tuple
from app.schema.feed_session import FeedSessionRepo
from app.dto.feed_session_dto import FeedSessionDto
import logging


class FeedManager:
    def __init__(self, fish_avg_weight_g: float, fish_count: int, model):
        """
        Manages feed calculation, prediction, and training workflow.

        Args:
            fish_avg_weight_g (float): Average fish weight in grams.
            fish_count (int): Number of fish in the tank/pond.
            model (object): Object with `predict(scaled_features)` and `train(scaled_features, target)`.
            input_function (callable): Input function for user feedback (default: built-in input).
            logger (callable): Logging/output function (default: built-in print).
        """
        self.fish_avg_weight_g = fish_avg_weight_g
        self.fish_count = fish_count
        self.model = model

        # Improved logger setup
        self.logger = logging.getLogger(__name__)
        logging.basicConfig(level=logging.INFO)

    def calculate_baseline_feed(self) -> float:
        """
        Calculate the baseline feed based on fish weight and count.
        """
        return (self.fish_avg_weight_g * self.fish_count / 1000) * 0.08

    def run(self, scaled_features: list) -> Tuple[float, float, float]:
        """
        Calculate the baseline feed, predict adjustment, and apply it.

        Args:
            scaled_features (list): The input features used to predict the feed adjustment.

        Returns:
            Tuple[float, float, float]: The baseline feed, final feed, and adjustment factor.
        """
        baseline_feed = self.calculate_baseline_feed()

        adjustment = 1.0
        final_feed = baseline_feed

        try:
            adjustment = self.model.predict(scaled_features)
            final_feed = round(baseline_feed * adjustment, 4)
        except Exception as e:
            self.logger.error(f"Prediction failed: {e}")

        self.logger.info(
            f"Calculated Feed: {baseline_feed:.2f} KG,Z Adjustment Factor: {adjustment:.2f}, Final Feed: {final_feed:.2f}"
        )

        return baseline_feed, final_feed, adjustment

    def retrain(self, scaled_features, actual_adjustment_factor: float) -> None:
        """
        Retrain the model with new data.

        Args:
            scaled_features (list): The features used to retrain the model.
            actual_adjustment_factor (float): The actual adjustment factor to train on.
        """
        try:
            self.model.train(scaled_features, actual_adjustment_factor)
            self.logger.info("Model retrained successfully.")
        except Exception as e:
            self.logger.error(f"Training skipped due to error: {e}")

    def update_raw_features(self, dto: FeedSessionDto) -> None:
        """
        Update the raw feed session features in the database.

        Args:
            dto (FeedSessionDto): Data transfer object containing feed session data.
        """
        FeedSessionRepo().insert_feed_session(dto)
        self.logger.info("Feed session data inserted successfully.")
