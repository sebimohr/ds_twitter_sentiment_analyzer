from flask import jsonify, request
from flask_restful import Resource
from pandas import DataFrame

from Algorithm.DataClasses.csv_helper import CsvHelper
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class SentimentAnalysisEndpoint(Resource):
    tweepy_client: TweepyClient
    max_results: int = 50

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving tweets from Twitter API")

        # get query parameter hashtag
        hashtag = StringValidator(request.args["hashtag"]) \
            .StringShouldNotBeEmpty() \
            .StringMustNotIncludeWhitespace() \
            .StringMustBeLongerThan(4)
        use_cached_data = StringValidator(request.args["cache"]) \
            .StringMustEqualBooleanValue()

        tweets: [Tweet] = []
        if use_cached_data == "true" and CsvHelper(hashtag).CachedDataDoesExist():
            # when cached data is used, the sentiment has already been analyzed
            try:
                cached_dataframe = CsvHelper(hashtag).GetDataFromCsv()
            except FileNotFoundError:
                cached_dataframe = DataFrame()
            tweets = TweetDataframeHelper(tweets).FromDataFrame(cached_dataframe)
        else:
            tweets = self.CachedDataIsNotUsed(hashtag)

        if len(tweets) < 1:
            tweets = self.CachedDataIsNotUsed(hashtag)

        return jsonify({'tweets': tweets})

    def CachedDataIsNotUsed(self, hashtag: str) -> [Tweet]:
        """ call this method when cached data is not used and new data has to be retrieved from Twitter """
        # when getting new data, retrieve tweets, save them in csv, analyze sentiment
        tweets = self.tweepy_client.GetTweetsByHashtag(hashtag, self.max_results)

        # get tweets from twitter api
        print(f"Retrieved {len(tweets)} Tweets")

        # analyze sentiment of tweets
        sentiment_analyzer = SentimentAnalyzer(tweets)
        tweets = sentiment_analyzer.AnalyseSentimentOfTweetList()

        # save analyzed tweets to cache for next usage
        if len(tweets) > 0:
            CsvHelper(hashtag).SaveDataToCsv(TweetDataframeHelper(tweets).ToDataFrame())

        return tweets
