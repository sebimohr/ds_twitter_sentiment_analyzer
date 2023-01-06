from textblob import TextBlob, blob

from Algorithm.DataClasses.tweet import Tweet


class SentimentAnalyzer:
    tweets: [Tweet]

    def __init__(self, tweets_from_api: [Tweet]):
        self.tweets = tweets_from_api

    def AnalyseSentimentOfTweetList(self) -> [Tweet]:
        """ analyzes the given tweets, returns the tweets but with values in the sentiment attributes """
        for tweet in self.tweets:
            blob_analyzed = TextBlob(tweet.content)

            # analyzed polarity of sentiment: -1 = negative, +1 = positive
            tweet.sentiment.sentiment_score = GetPolarity(blob_analyzed)
            tweet_polarity_rating = RatePolarity(tweet)
            tweet.sentiment.sentiment_rating_value = tweet_polarity_rating

        return self.tweets


def GetPolarity(text: blob.BaseBlob) -> float:
    """ gets polarity from blob """
    return text.polarity


def RatePolarity(tweet: Tweet) -> int:
    """ rates polarity in tweet """
    polarity_score = tweet.sentiment.sentiment_score

    if polarity_score < 0.5:
        return -2
    elif polarity_score < 0:
        return -1
    elif polarity_score > 0.5:
        return 2
    elif polarity_score > 0:
        return 1
    else:
        return 0


def PercentageOfTweets(all_tweets_size: int, list_size: int) -> float:
    """ returns percentage of tweets in list """
    percentage = list_size / all_tweets_size * 100
    return percentage
