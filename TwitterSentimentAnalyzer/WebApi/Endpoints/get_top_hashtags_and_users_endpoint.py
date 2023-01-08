from flask import request, jsonify
from flask_restful import Resource, abort

from Algorithm.DataClasses.csv_helper import CsvHelper
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.TopHashtagsAndUsers.top_hashtags_and_users_analyzer import TopHashtagsAndUsersAnalyzer
from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetTopHashtagsAndUsersEndpoint(Resource):
    tweepy_client: TweepyClient

    def __init__(self):
        self.tweepy_client = TweepyClient()

    def get(self):
        print("Analyzing top hashtags and users")

        hashtag = request.args["hashtag"]
        StringValidator(hashtag) \
            .StringShouldNotBeEmpty() \
            .StringMustNotIncludeWhitespace() \
            .StringMustBeLongerThan(3)

        tweets: [Tweet] = []
        try:
            cached_dataframe = CsvHelper(hashtag).GetDataFromCsv()
        except FileNotFoundError:
            abort(400, message = f"Couldn't find cached data for hashtag {hashtag}")
            return

        tweets = TweetDataframeHelper(tweets).FromDataFrame(cached_dataframe)
        user_list, hashtag_list = TopHashtagsAndUsersAnalyzer(tweets, hashtag).AnalyzeTweetList()

        for user in user_list:
            user.id = user.name
            user.name = GetUsername(self.tweepy_client, user.id)

        return jsonify({
            'hashtags': hashtag_list[:5],
            'users': user_list[:5]
        })


def GetUsername(tweepy_client: TweepyClient, user_id: str) -> str:
    return tweepy_client.GetUserMetricsByUserId(user_id).username
