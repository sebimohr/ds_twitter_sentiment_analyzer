from dataclasses import dataclass

from Algorithm.DataClasses.tweet_metrics import TweetMetrics
from Algorithm.DataClasses.tweet_sentiment import TweetSentiment


@dataclass
class Tweet:
    id: str
    content: str
    metrics: TweetMetrics
    sentiment: TweetSentiment
