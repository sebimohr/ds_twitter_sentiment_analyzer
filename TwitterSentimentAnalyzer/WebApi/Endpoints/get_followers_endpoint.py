from flask import jsonify
from flask_restful import Resource

from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetFollowersEndpoint(Resource):
    tweepy_client: TweepyClient
    user_id: str

    def __init__(self, user_id: str):
        self.tweepy_client = TweepyClient()
        self.user_id = user_id

    def get(self):
        print("Retrieving users from Twitter API")

        # get users from Twitter api
        users = self.tweepy_client.GetFollowersByUserId(self.user_id)
        print(f"Retrieved {len(users)} Users")

        return jsonify({'users': users})
