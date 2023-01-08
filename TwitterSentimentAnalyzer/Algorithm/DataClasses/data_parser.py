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
            tweet_metrics: TweetMetrics
            if tweet.public_metrics is not None:
                tweet_metrics = TweetMetrics(
                        tweet.author_id,
                        tweet.created_at,
                        tweet.public_metrics["retweet_count"],
                        tweet.public_metrics["reply_count"],
                        tweet.public_metrics["like_count"],
                        tweet.public_metrics["quote_count"]
                )
            else:
                tweet_metrics = TweetMetrics(
                        tweet.author_id,
                        tweet.created_at,
                        0, 0, 0, 0
                )

            tweet_list.append(
                    Tweet(
                            tweet.id,
                            tweet.text,
                            tweet_metrics,
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
        user_metric: UserMetric

        if user.public_metrics is not None:
            user_metric = UserMetric(
                    user.public_metrics["followers_count"],
                    user.public_metrics["following_count"],
                    user.public_metrics["tweet_count"],
                    user.public_metrics["listed_count"],
                    user.verified
            )
        else:
            user_metric = UserMetric(
                    0, 0, 0, 0,
                    user.verified
            )

        return User(
                user.id,
                user.name,
                user.username,
                user.description,
                user.profile_image_url,
                user_metric
        )
