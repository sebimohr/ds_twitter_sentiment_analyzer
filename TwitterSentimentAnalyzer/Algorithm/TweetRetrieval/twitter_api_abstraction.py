import string

import tweepy


class TweepyClient:
    client: tweepy.Client

    def __init__(self, bearer_token: string):
        self.client = tweepy.Client(bearer_token=bearer_token)

    def getTweetsByHashtag(self, hashtag: string, max_results=50):
        # normalize hashtag before sending request to the api
        hashtag.strip()
        if hashtag[0] != '#':
            hashtag = "#" + hashtag

        query = f'{hashtag} lang:en'
        tweets = self.client.search_recent_tweets(query=query,
                                                  tweet_fields=['context_annotations', 'created_at'],
                                                  max_results=max_results)

        return tweets
