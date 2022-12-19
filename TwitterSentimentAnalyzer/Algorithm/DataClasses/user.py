from dataclasses import dataclass

from Algorithm.DataClasses.user_metric import UserMetric


@dataclass
class User:
    id: str
    name: str
    username: str
    description: str
    profile_image_url: str
    metrics: UserMetric
