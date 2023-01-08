import tweepy

from Algorithm.DataClasses.data_parser import DataParser
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.user import User
from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.environment_variables import EnvironmentVariablesHelper


class TweepyClient:
    client: tweepy.Client

    def __init__(self):
        self.client = tweepy.Client(EnvironmentVariablesHelper.GetBearerToken())

    def GetTweetsByHashtag(self, hashtag: str, max_results = 50) -> [Tweet]:
        """ retrieves tweets from Twitter api """
        # validate input before accessing api
        validator = StringValidator(hashtag)
        validator.StringShouldNotBeEmpty().StringMustNotIncludeWhitespace()

        # normalize hashtag before sending request to the api       
        hashtag.strip()
        if hashtag[0] != '#':
            hashtag = "#" + hashtag

        query = f'{hashtag} lang:en'
        tweets = self.client.search_recent_tweets(query = query,
                                                  tweet_fields = ['id', 'text', 'author_id', 'created_at',
                                                                  'public_metrics'],
                                                  max_results = max_results)

        return DataParser.ParseTweetsFromApiToTweetDataClassList(tweets)

    def GetFollowersByUserId(self, user_id: str) -> [User]:
        """ loads all followers of the user with the specified user_id """
        # validate input before accessing api
        validator = StringValidator(user_id)
        validator.StringShouldNotBeEmpty().StringMustNotIncludeWhitespace()

        user_id.strip()
        users = self.client.get_users_followers(id = user_id)

        return DataParser.ParseUsersFromApiToUsersDataClassList(users)

    def GetUserMetricsByUserId(self, user_id: str) -> User:
        """ load a user by user id """
        if isinstance(user_id, str):
            validator = StringValidator(user_id)
            validator.StringShouldNotBeEmpty().StringMustNotIncludeWhitespace()

            user_id.strip()

        user = self.client.get_user(id = user_id)

        return DataParser.ParseUserFromApiToUserDataClass(user.data)
