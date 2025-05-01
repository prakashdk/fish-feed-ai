from dataclasses import dataclass
from typing import Dict


@dataclass
class RawFeedFactorsDto:
    ph: float
    turbidity: float
    tds: float
    # Add more fields as needed

    def to_dict(self) -> Dict[str, float]:
        """Convert the DTO to a dictionary for MongoDB storage."""
        return self.__dict__
