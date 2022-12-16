from Algorithm.TweetRetrieval.environment_variables import get_bearer_token
from Algorithm.TweetRetrieval.twitter_api_abstraction import build_tweepy_client, get_tweets_by_hashtag
from Algorithm.SentimentAnalysis.sentiment_analysis import analyse_sentiment_of_tweet_list

print("Retrieving tweets from Twitter API, this may take a moment")

client = build_tweepy_client(get_bearer_token())
tweets = get_tweets_by_hashtag(client, "football", 50)

print(f"Retrieved {len(tweets.data)} Tweets")

# analyse_sentiment_of_tweet_list(tweets)

print("\nClosing the program")
