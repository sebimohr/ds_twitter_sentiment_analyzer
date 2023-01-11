from flask import jsonify, request
from flask_restful import Resource
from pandas import DataFrame

from Algorithm.DataClasses.csv_helper import CsvHelper
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetSentimentAnalysisEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving tweets from Twitter API")

        # get query parameters and validate them
        hashtag = request.args["hashtag"]
        StringValidator(hashtag) \
            .StringShouldNotBeEmpty() \
            .StringMustNotIncludeWhitespace() \
            .StringMustBeLongerThan(3)

        use_cached_data = request.args["cache"]
        StringValidator(use_cached_data) \
            .StringMustEqualBooleanValue()

        tweet_count = request.args["tweet_count"]
        StringValidator(tweet_count) \
            .StringShouldNotBeEmpty() \
            .StringMustNotIncludeWhitespace() \
            .StringMustBeANumber()

        tweet_count = int(tweet_count)
        if tweet_count < 20 or tweet_count > 200:
            tweet_count = 50

        tweets: [Tweet] = []
        if use_cached_data == "true" and CsvHelper(hashtag).CachedDataDoesExist():
            # when cached data is used, the sentiment has already been analyzed
            try:
                cached_dataframe = CsvHelper(hashtag).GetDataFromCsv()
            except FileNotFoundError:
                cached_dataframe = DataFrame()
            tweets = TweetDataframeHelper(tweets).FromDataFrame(cached_dataframe)
        else:
            tweets = self.CachedDataIsNotUsed(hashtag, tweet_count)

        if len(tweets) < 1:
            tweets = self.CachedDataIsNotUsed(hashtag, tweet_count)

        return jsonify({'tweets': tweets})

    def CachedDataIsNotUsed(self, hashtag: str, tweet_count: int) -> [Tweet]:
        """ call this method when cached data is not used and new data has to be retrieved from Twitter """
        # when getting new data, retrieve tweets, save them in csv, analyze sentiment
        tweets = self.tweepy_client.GetTweetsByHashtag(hashtag, tweet_count)

        # get tweets from twitter api
        print(f"Retrieved {len(tweets)} Tweets")

        # analyze sentiment of tweets
        sentiment_analyzer = SentimentAnalyzer(tweets)
        tweets = sentiment_analyzer.AnalyseSentimentOfTweetList()

        # save analyzed tweets to cache for next usage
        if len(tweets) > 0:
            CsvHelper(hashtag).SaveDataToCsv(TweetDataframeHelper(tweets).ToDataFrame())

        return tweets
