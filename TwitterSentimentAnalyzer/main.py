from Algorithm.SentimentAnalysis.sentiment_analysis import analyseSentimentOfTweetList
from Algorithm.TweetRetrieval.environment_variables import getBearerToken
from Algorithm.TweetRetrieval.twitter_api_abstraction import buildTweepyClient, getTweetsByHashtag

print("Retrieving tweets from Twitter API, this may take a moment")

client = buildTweepyClient(getBearerToken())
tweets = getTweetsByHashtag(client, "football", 50)

print(f"Retrieved {len(tweets.data)} Tweets")

analyseSentimentOfTweetList(tweets.data)

print("\nClosing the program")
