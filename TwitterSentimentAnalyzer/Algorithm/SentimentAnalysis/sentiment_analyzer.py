from textblob import TextBlob, blob


class SentimentAnalyzer:
    tweets: []
    
    def __init__(self, tweets_from_api: []):
        self.tweets = tweets_from_api

    def analyseSentimentOfTweetList(self):
        positive = 0
        negative = 0
        neutral = 0
        polarity = 0
        tweet_list = []
        neutral_list = []
        negative_list = []
        positive_list = []

        tweets_count = len(self.tweets)

        for tweet in self.tweets:
            tweet_list.append(tweet.text)
            blob_analyzed = TextBlob(tweet.text)

            sent = blob_analyzed.sentiment
            # analyzed polarity of sentiment: -1 = negative, +1 = positive
            polarity = getPolarity(blob_analyzed)
            polarity_rating = ratePolarity(polarity)

            '''score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
            neg = score['neg']
            neu = score['neu']
            pos = score['pos']
            comp = score['compound']
    
            polarity += analysis.sentiment.polarity
    
            if neg > pos:
                negative_list.append(tweet.text)
                negative += 1
    
            elif pos > neg:
                positive_list.append(tweet.text)
                positive += 1
    
            elif pos == neg:
                neutral_list.append(tweet.text)
                neutral += 1
    
            positive = percentage_of_tweets(positive, tweets_count)
            negative = percentage_of_tweets(negative, tweets_count)
            neutral = percentage_of_tweets(neutral, tweets_count)
            polarity = percentage_of_tweets(polarity, tweets_count)'''

        print(f"Positive tweets percentage: {positive}\n"
              f"Negative tweets percentage: {negative}\n"
              f"Neutral tweets percentage:{neutral}")


def getPolarity(text: blob.BaseBlob):
    return text.polarity


def ratePolarity(polarity_score: float):
    if polarity_score < 0.5:
        return "Negative"
    elif polarity_score < 0.2:
        return "rather Negative"
    elif polarity_score > 0.5:
        return "Positive"
    elif polarity_score > 0.2:
        return "rather Positive"
    else:
        return "Neutral"


def percentageOfTweets(tweets_count: float, list_size: float):
    percentage = tweets_count / list_size * 100
    return percentage
