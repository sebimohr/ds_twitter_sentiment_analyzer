from flask import request, jsonify
from flask_restful import Resource

from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetUserTweetsEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving user information from Twitter API")

        # get query parameter
        user_id = request.args["user_id"]

        tweets = self.tweepy_client.GetTweetsFromUserId(user_id)

        return jsonify({'tweets': tweets})
