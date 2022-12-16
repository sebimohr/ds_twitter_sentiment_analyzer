from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob


def percentage_of_tweets(tweets_count: int, list_size: int):
    percentage = tweets_count / list_size * 100
    return percentage


def analyse_sentiment_of_tweet_list(tweets):
    positive = 0
    negative = 0
    neutral = 0
    polarity = 0
    tweet_list = []
    neutral_list = []
    negative_list = []
    positive_list = []

    tweets_count = len(tweets.data)

    for tweet in tweets.data:
        tweet_list.append(tweet.text)
        analysis = TextBlob(tweet.text)
        score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
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
        polarity = percentage_of_tweets(polarity, tweets_count)

    print(f"Positive tweets percentage: {positive}\nNegative tweets percentage: {negative}\n"
          f"Neutral tweets percentage:{neutral}")
