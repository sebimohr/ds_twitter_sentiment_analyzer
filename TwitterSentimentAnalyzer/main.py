from Algorithm.SentimentAnalysis.sentiment_analyzer import SentimentAnalyzer
from Algorithm.TweetRetrieval.environment_variables import EnvironmentVariablesHelper
from Algorithm.TweetRetrieval.twitter_api_abstraction import TweepyClient


class Main:
    print("Retrieving tweets from Twitter API, this may take a moment")

    # get tweets from twitter api
    tweepyClient = TweepyClient(EnvironmentVariablesHelper.getBearerToken())
    tweets = tweepyClient.getTweetsByHashtag("FIFAWorldCup", 50)

    print(f"Retrieved {len(tweets.data)} Tweets")

    # analyze sentiment of tweets
    sentimentAnalyzer = SentimentAnalyzer(tweets.data)
    # sentimentAnalyzer.analyseSentimentOfTweetList()

    # ending the program
    print("\nClosing the program")
