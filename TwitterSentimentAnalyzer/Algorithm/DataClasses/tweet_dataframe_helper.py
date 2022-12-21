from pandas import DataFrame

from Algorithm.DataClasses.tweet import Tweet


class TweetDataframeHelper:
    tweet_list: [Tweet]

    def __init__(self, tweet_list: [Tweet]):
        self.tweet_list = tweet_list

    def ToDataFrame(self) -> DataFrame:
        return DataFrame.from_dict(self.tweet_list)

    def FromDataFrame(self, data: DataFrame):
        return data.to_dict(into = self.tweet_list)
