from flask import jsonify
from flask_restful import Resource

from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class SentimentAnalysisEndpoint(Resource):
    tweepy_client: TweepyClient
    hashtag: str

    def __init__(self, hashtag: str):
        self.tweepy_client = TweepyClient()
        self.hashtag = hashtag

    def get(self):
        print("Retrieving tweets from Twitter API")

        # get tweets from twitter api
        tweets = self.tweepy_client.GetTweetsByHashtag(self.hashtag, 50)
        print(f"Retrieved {len(tweets)} Tweets")

        # analyze sentiment of tweets
        sentiment_analyzer = SentimentAnalyzer(tweets)
        sentiment_analyzer.AnalyseSentimentOfTweetList()

        return jsonify({'tweets': tweets})
