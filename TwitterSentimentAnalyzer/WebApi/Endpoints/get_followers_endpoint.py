from flask import jsonify, request
from flask_restful import Resource

from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetFollowersEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Retrieving users from Twitter API")

        # get query parameter
        user_id = request.args["user_id"]

        # get users from Twitter api
        users = self.tweepy_client.GetFollowersByUserId(user_id)
        print(f"Retrieved {len(users)} Users")

        return jsonify({'users': users})
