import datetime

from dataclasses import dataclass


@dataclass
class TweetMetrics:
    author_id: str
    created_at: datetime
    retweet_count: int
    reply_count: int
    like_count: int
    quote_count: int
