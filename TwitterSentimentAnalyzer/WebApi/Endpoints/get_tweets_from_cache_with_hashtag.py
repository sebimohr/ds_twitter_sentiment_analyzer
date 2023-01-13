from flask import request, jsonify
from flask_restful import Resource, abort

from Algorithm.DataClasses.csv_helper import CsvHelper
from Algorithm.DataClasses.tweet import Tweet
from Algorithm.DataClasses.tweet_dataframe_helper import TweetDataframeHelper
from Algorithm.TwitterApiAbstractions.tweepy_client import TweepyClient


class GetTweetsFromCacheWithHashtagEndpoint(Resource):
    @staticmethod
    def get():
        print("Retrieving tweets with hashtag")

        # get query parameters
        main_hashtag = request.args["hashtag"]
        searched_for_hashtag = "#" + request.args["search_tag"]
        
        all_tweets: [Tweet] = []
        try:
            cached_dataframe = CsvHelper(main_hashtag).GetDataFromCsv()
        except FileNotFoundError:
            abort(400, message = f"Couldn't find cached data for hashtag {main_hashtag}")
            return

        all_tweets = TweetDataframeHelper(all_tweets).FromDataFrame(cached_dataframe)

        tweet_list: [Tweet] = []
        for tweet in all_tweets:
            if searched_for_hashtag.lower() in tweet.content.lower():
                tweet_list.append(tweet)
                
        return jsonify({
            'tweets': tweet_list
        })
