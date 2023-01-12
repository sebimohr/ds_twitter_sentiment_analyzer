from flask import request, jsonify
from flask_restful import Resource

from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetUserInformationEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving user information from Twitter API")

        # get query parameter
        user_id = request.args["user_id"]

        # get user information from Twitter api
        user = self.tweepy_client.GetUserMetricsByUserId(user_id)
        print(f"Retrieved information for user with id {user_id}")

        return jsonify({'user': user})
