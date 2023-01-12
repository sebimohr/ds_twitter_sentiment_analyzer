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

        not_found_users = []
        for user in user_list[:15]:
            user.id = user.name
            user.name = GetUsername(self.tweepy_client, user.id)
            if not (len(user.name) > 0):
                not_found_users.append(user)

        if len(not_found_users) > 0:
            for not_found_user in not_found_users:
                try:
                    user_list.remove(not_found_user)
                except ValueError:
                    print(f"Wasn't able to remove user with id '{not_found_user.id}'")

        print(f"Retrieved {len(hashtag_list)} hashtags and {len(user_list)} users.")

        return jsonify({
            'hashtags': hashtag_list[:10],
            'users': user_list[:10]
        })


def GetUsername(tweepy_client: TweepyClient, user_id: str) -> str:
    return tweepy_client.GetUserMetricsByUserId(user_id).username
