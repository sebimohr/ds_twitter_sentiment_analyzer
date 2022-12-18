import string
import tweepy


def buildTweepyClient(bearer_token: string):
    client = tweepy.Client(bearer_token=bearer_token)
    return client


def getTweetsByHashtag(client: tweepy.Client, hashtag: string, max_results=50):
    # normalize hashtag before sending request to the api
    hashtag.strip()
    if hashtag[0] != '#':
        hashtag = "#" + hashtag

    query = f'{hashtag} lang:en'
    tweets: dict = client.search_recent_tweets(query=query,
                                               tweet_fields=['context_annotations', 'created_at'],
                                               max_results=max_results)

    return tweets
