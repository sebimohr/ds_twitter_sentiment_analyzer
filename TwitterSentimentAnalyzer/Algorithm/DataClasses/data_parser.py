from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_metrics import TweetMetrics
from Algorithm.DataClasses.tweet_sentiment import TweetSentiment
from Algorithm.DataClasses.user import User
from Algorithm.DataClasses.user_metric import UserMetric


class DataParser:
    @staticmethod
    def ParseTweetsFromApiToTweetDataClassList(tweets) -> [Tweet]:
        tweet_list: [Tweet] = []
        for tweet in tweets.data:
            tweet_list.append(
                    Tweet(
                            tweet.id,
                            tweet.text,
                            TweetMetrics(
                                    tweet.author_id,
                                    tweet.created_at,
                                    tweet.public_metrics["retweet_count"],
                                    tweet.public_metrics["reply_count"],
                                    tweet.public_metrics["like_count"],
                                    tweet.public_metrics["quote_count"]
                            ),
                            TweetSentiment(
                                    0.0,
                                    0
                            )
                    ))

        return tweet_list

    def ParseUsersFromApiToUsersDataClassList(self, user) -> [User]:
        user_list: [User] = []
        for account in user.data:
            if not account.protected:
                user_list.append(self.ParseUserFromApiToUserDataClass(account))

        return user_list

    @staticmethod
    def ParseUserFromApiToUserDataClass(user) -> User:
        return User(
                user.id,
                user.name,
                user.usename,
                user.description,
                user.profile_image_url,
                UserMetric(
                        user.public_metrics["followers_count"],
                        user.public_metrics["following_count"],
                        user.public_metrics["tweet_count"],
                        user.public_metrics["listed_count"],
                        user.verified
                )
        )
