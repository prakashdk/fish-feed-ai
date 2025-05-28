import os
import joblib
import logging
from sklearn.linear_model import SGDRegressor


class FeedAdjustmentModel:
    def __init__(self, model_path, learning_rate="constant", eta0=0.01):
        """
        Initializes the FeedAdjustmentModel with the model path and training parameters.

        Args:
            model_path (str): Path where the model is stored.
            learning_rate (str): Learning rate for the SGDRegressor.
            eta0 (float): Initial learning rate for the SGDRegressor.
        """
        self.model_path = model_path
        self.learning_rate = learning_rate
        self.eta0 = eta0

        # Set up logging
        logging.basicConfig(
            level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
        )

        # Ensure the directory exists for saving the model
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

        # Load or initialize the model
        self.model = self.__load_or_initialize_model()

    def __load_or_initialize_model(self):
        """
        Loads an existing model from disk or initializes a new one if not found.

        Returns:
            SGDRegressor: The loaded or initialized model.
        """
        if os.path.exists(self.model_path):
            logging.info("Loading existing model.")
            return joblib.load(self.model_path)
        else:
            logging.info("No existing model found, initializing a new model.")
            return SGDRegressor(learning_rate=self.learning_rate, eta0=self.eta0)

    def predict(self, scaled_features):
        """
        Predicts the adjustment factor using the trained model.

        Args:
            scaled_features (np.ndarray): The scaled feature values for prediction.

        Returns:
            float: The predicted adjustment factor, or 1.0 if an error occurs.
        """
        try:
            return self.model.predict(scaled_features)[0]
        except Exception as e:
            logging.error(f"Error during prediction: {e}")
            return 1.0

    def train(self, scaled_features, adjustment_factor):
        """
        Trains the model using the current features and actual adjustment factor.
        The model is updated using partial_fit and saved to disk after training.

        Args:
            scaled_features (np.ndarray): The scaled feature values for training.
            adjustment_factor (float): The actual adjustment factor for training.

        Returns:
            None
        """
        try:
            self.model.partial_fit(scaled_features, [adjustment_factor])
            joblib.dump(self.model, self.model_path)
            logging.info(f"Model trained and saved to {self.model_path}.")
        except Exception as e:
            logging.error(f"Error during training: {e}")
