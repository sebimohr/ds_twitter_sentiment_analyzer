import json
from datetime import datetime, date

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
        for tweet in self.tweet_list:
            created_at_json = json.dumps(tweet.metrics.created_at, default = json_serializer_date).strip('"')
            tweet.metrics.created_at = created_at_json

        return DataFrame(self.tweet_list)

    def FromDataFrame(self, data: DataFrame) -> [Tweet]:
        """ converts dataFrame into tweet object """
        if len(data) < 1:
            return self.tweet_list

        for tweet in data.to_dict(orient = 'index').values():
            # this is not the best way, but it works for the time
            # Should be updated sometimes -> DataFrame cells should be named "metrics.author_id" for example
            metrics = json.loads(tweet["metrics"].replace('\'', '"'))
            sentiment = json.loads(tweet["sentiment"].replace('\'', '"'))

            self.tweet_list.append(Tweet(tweet["id"],
                                         tweet["content"],
                                         TweetMetrics(metrics["author_id"],
                                                      datetime.strptime(metrics["created_at"][:10],
                                                                        '%Y-%m-%d').date(),
                                                      metrics["retweet_count"],
                                                      metrics["reply_count"],
                                                      metrics["like_count"],
                                                      metrics["quote_count"]),
                                         TweetSentiment(sentiment["sentiment_score"],
                                                        sentiment["sentiment_rating_value"])
                                         ))

        return self.tweet_list


def json_serializer_date(obj):
    """ JSON Serializer for date serialization """
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))
