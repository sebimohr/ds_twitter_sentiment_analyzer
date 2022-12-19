from textblob import TextBlob, blob

from Algorithm.DataClasses.tweet import Tweet


class SentimentAnalyzer:
    tweets: [Tweet]

    def __init__(self, tweets_from_api: [Tweet]):
        self.tweets = tweets_from_api

    def AnalyseSentimentOfTweetList(self):
        neutral_list = []
        negative_list = []
        positive_list = []

        tweets_count = len(self.tweets)

        for tweet in self.tweets:
            blob_analyzed = TextBlob(tweet.content)

            # analyzed polarity of sentiment: -1 = negative, +1 = positive
            tweet.sentiment.sentiment_score = GetPolarity(blob_analyzed)
            tweet_polarity_rating = RatePolarity(tweet)
            tweet.sentiment.sentiment_rating_value = tweet_polarity_rating

            if tweet_polarity_rating > 0:
                negative_list.append(tweet)
            elif tweet_polarity_rating > 0:
                positive_list.append(tweet)
            else:
                neutral_list.append(tweet)

        print(f"Positive tweets percentage: {PercentageOfTweets(tweets_count, len(positive_list))}%\n"
              f"Negative tweets percentage: {PercentageOfTweets(tweets_count, len(negative_list))}%\n"
              f"Neutral tweets percentage:{PercentageOfTweets(tweets_count, len(neutral_list))}%")


def GetPolarity(text: blob.BaseBlob):
    return text.polarity


def RatePolarity(tweet: Tweet):
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


def PercentageOfTweets(all_tweets_size: float, list_size: float):
    percentage = list_size / all_tweets_size * 100
    return percentage
