from flask import request, jsonify
from flask_restful import Resource
from pandas import DataFrame

from Algorithm.DataClasses.csv_helper import CsvHelper
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetUserInformationEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving user information from Twitter API")

        # get query parameter
        user_id = request.args["user_id"]
        hashtag = request.args.get("hashtag", None)

        tweets: [Tweet] = []
        if hashtag is not None:
            if CsvHelper(hashtag).CachedDataDoesExist():
                try:
                    cached_dataframe = CsvHelper(hashtag).GetDataFromCsv()
                except FileNotFoundError:
                    cached_dataframe = DataFrame()
                tweets_from_csv: [Tweet] = []
                tweets_from_csv = TweetDataframeHelper(tweets_from_csv).FromDataFrame(cached_dataframe)
                if len(tweets_from_csv) > 0:
                    for tweet in tweets_from_csv:
                        if tweet.metrics.author_id == user_id:
                            tweets.append(tweet)

        # get user information from Twitter api
        user = self.tweepy_client.GetUserMetricsByUserId(user_id)
        user.tweets = tweets
        print(f"Retrieved information for user with id {user_id}")

        return jsonify({'user': user})
