from dataclasses import dataclass


@dataclass
class UserMetric:
    followers_count: int
    following_count: int
    tweet_count: int
    listed_count: int
    verified: bool
