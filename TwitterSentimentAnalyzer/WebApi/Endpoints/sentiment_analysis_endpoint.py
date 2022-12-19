from flask import jsonify, request
from flask_restful import Resource

from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class SentimentAnalysisEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving tweets from Twitter API")

        # get query parameter hashtag
        hashtag = request.args["hashtag"]

        # get tweets from twitter api
        tweets = self.tweepy_client.GetTweetsByHashtag(hashtag, 50)
        print(f"Retrieved {len(tweets)} Tweets")

        # analyze sentiment of tweets
        sentiment_analyzer = SentimentAnalyzer(tweets)
        sentiment_analyzer.AnalyseSentimentOfTweetList()

        return jsonify({'tweets': tweets})
