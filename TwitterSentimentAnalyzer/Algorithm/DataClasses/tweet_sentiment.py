from dataclasses import dataclass


@dataclass
class TweetSentiment:
    sentiment_score: float
    sentiment_rating_value: int
