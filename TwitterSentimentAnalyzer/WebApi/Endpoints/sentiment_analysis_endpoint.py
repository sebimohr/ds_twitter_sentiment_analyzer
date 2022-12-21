from flask import jsonify, request
from flask_restful import Resource
from pandas import DataFrame

from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient
from Algorithm.DataClasses.csv_helper import CsvHelper


class SentimentAnalysisEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving tweets from Twitter API")

        # get query parameter hashtag
        hashtag = request.args["hashtag"]
        use_cached_data = request.args["cache"]

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
        # when getting new data, retrieve tweets, save them in csv, analyze sentiment
        tweets = self.tweepy_client.GetTweetsByHashtag(hashtag, 50)

        # get tweets from twitter api
        print(f"Retrieved {len(tweets)} Tweets")

        # analyze sentiment of tweets
        sentiment_analyzer = SentimentAnalyzer(tweets)
        tweets = sentiment_analyzer.AnalyseSentimentOfTweetList()

        # save analyzed tweets to cache for next usage
        if len(tweets) > 0:
            CsvHelper(hashtag).SaveDataToCsv(TweetDataframeHelper(tweets).ToDataFrame())

        return tweets
