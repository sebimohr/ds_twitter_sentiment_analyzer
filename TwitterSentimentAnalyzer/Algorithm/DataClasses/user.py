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

    @staticmethod
    def EmptyUserWithId(user_id: str):
        return User(
                user_id,
                "",
                "",
                "",
                "",
                UserMetric(
                        0, 0, 0, 0, False
                )
        )
