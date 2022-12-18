import tweepy

from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_metrics import TweetMetrics
from Algorithm.DataClasses.tweet_sentiment import TweetSentiment


class TweepyClient:
    client: tweepy.Client

    def __init__(self, bearer_token: str):
        self.client = tweepy.Client(bearer_token=bearer_token)

    def getTweetsByHashtag(self, hashtag: str, max_results=50):
        # normalize hashtag before sending request to the api
        hashtag.strip()
        if hashtag[0] != '#':
            hashtag = "#" + hashtag

        query = f'{hashtag} lang:en'
        tweets = self.client.search_recent_tweets(query=query,
                                                  tweet_fields=['id', 'text', 'author_id', 'created_at',
                                                                'public_metrics'],
                                                  max_results=max_results)

        return parseTweetsFromApiToTweetDataClassList(tweets)


def parseTweetsFromApiToTweetDataClassList(tweets):
    tweet_list: [Tweet] = []
    for tweet in tweets.data:
        tweet_list.append(Tweet(
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
