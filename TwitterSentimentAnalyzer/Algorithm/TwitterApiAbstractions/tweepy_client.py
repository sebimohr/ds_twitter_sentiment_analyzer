import tweepy

from Algorithm.DataClasses.data_parser import DataParser
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.user import User
from Algorithm.TwitterApiAbstractions.string_validator import StringValidator
from Algorithm.environment_variables import EnvironmentVariablesHelper


class TweepyClient:
    client: tweepy.Client

    required_tweet_fields = ['id', 'text', 'author_id', 'created_at', 'public_metrics']
    required_user_fields = ['id', 'name', 'username', 'description', 'profile_image_url', 'public_metrics', 'verified']

    def __init__(self):
        self.client = tweepy.Client(EnvironmentVariablesHelper.GetBearerToken(),
                                    wait_on_rate_limit = True)

    def GetTweetsByHashtag(self, hashtag: str, max_results = 50) -> [Tweet]:
        """ retrieves tweets from Twitter api """
        # validate input before accessing api
        validator = StringValidator(hashtag)
        validator.StringShouldNotBeEmpty().StringMustNotIncludeWhitespace()

        # normalize hashtag before sending request to the api       
        hashtag.strip()
        if hashtag[0] != '#':
            hashtag = "#" + hashtag

        query = f'{hashtag} lang:en -is:retweet has:hashtags'
        tweets = self.client.search_recent_tweets(query = query,
                                                  sort_order = "relevancy",
                                                  tweet_fields = self.required_tweet_fields,
                                                  max_results = max_results)

        return DataParser.ParseTweetsFromApiToTweetDataClassList(tweets)

    def GetFollowersByUserId(self, user_id: str) -> [User]:
        """ loads all followers of the user with the specified user_id """
        # validate input before accessing api
        user_id = ValidateUserId(user_id)

        users = self.client.get_users_followers(id = user_id, user_fields = self.required_user_fields)
        return DataParser().ParseUsersFromApiToUsersDataClassList(users)

    def GetUserMetricsByUserId(self, user_id: str) -> User:
        """ load a user by user id """
        user_id = ValidateUserId(user_id)

        user = self.client.get_user(id = user_id, user_fields = self.required_user_fields)

        if user.data is None:
            return User.EmptyUserWithId(user_id)

        return DataParser.ParseUserFromApiToUserDataClass(user.data)

    def GetTweetsFromUserId(self, user_id: str) -> User:
        """ load tweets from a user by their user_id """
        user_id = ValidateUserId(user_id)

        tweets = self.client.get_users_tweets(id = user_id,
                                              tweet_fields = self.required_tweet_fields,
                                              max_results = 50)

        return DataParser.ParseTweetsFromApiToTweetDataClassList(tweets)


def ValidateUserId(user_id: str) -> str:
    validator = StringValidator(user_id)
    user_id = validator.StringShouldNotBeEmpty() \
        .StringMustNotIncludeWhitespace() \
        .Value()

    return user_id
