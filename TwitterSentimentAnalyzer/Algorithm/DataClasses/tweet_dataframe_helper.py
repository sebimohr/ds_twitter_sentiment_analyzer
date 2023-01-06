import json

import pandas as pd
import pandas.io.json
from pandas import DataFrame

from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_metrics import TweetMetrics
from Algorithm.DataClasses.tweet_sentiment import TweetSentiment


class TweetDataframeHelper:
    tweet_list: [Tweet]

    def __init__(self, tweet_list: [Tweet]):
        self.tweet_list = tweet_list

    def ToDataFrame(self) -> DataFrame:
        """ convert tweet_list into DataFrame object """
        return DataFrame.from_dict(self.tweet_list)

    def FromDataFrame(self, data: DataFrame) -> [Tweet]:
        """ converts dataFrame into tweet object """
        if len(data) < 1:
            return self.tweet_list

        for tweet in data.to_dict(orient = 'index').values():
            # TODO: sentiment and metrics currently get saved as string -> read how to do it with dataFrame
            metrics = json.loads(tweet['metrics'].replace("'", "\""))
            sentiment = json.loads(tweet['sentiment'].replace("'", "\""))

            self.tweet_list.append(Tweet(tweet["id"],
                                         tweet["content"],
                                         TweetMetrics(metrics["author_id"],
                                                      metrics["created_at"],
                                                      metrics["retweet_count"],
                                                      metrics["reply_count"],
                                                      metrics["like_count"],
                                                      metrics["quote_count"]),
                                         TweetSentiment(sentiment["sentiment_score"],
                                                        sentiment["sentiment_rating_value"])
                                         ))

        return self.tweet_list
