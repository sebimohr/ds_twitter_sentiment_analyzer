from pandas import DataFrame

from Algorithm.DataClasses.tweet import Tweet


class TweetDataframeHelper:
    tweet_list: [Tweet]

    def __init__(self, tweet_list: [Tweet]):
        self.tweet_list = tweet_list

    def ToDataFrame(self) -> DataFrame:
        return DataFrame.from_dict(self.tweet_list)

    def FromDataFrame(self, data: DataFrame) -> [Tweet]:
        if len(data) < 1:
            return self.tweet_list

        for tweet in data.to_dict(orient = 'index').values():
            self.tweet_list.append(Tweet(tweet["id"],
                                         tweet["content"],
                                         tweet["metrics"],
                                         tweet["sentiment"]))

        return self.tweet_list
