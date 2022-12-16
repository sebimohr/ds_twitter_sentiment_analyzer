# For sending GET requests from the API
import requests
# For saving access tokens and for file management when creating and adding to the dataset
# For dealing with json responses we receive from the API
import json
# For displaying the data after
import pandas as pd
# For saving the response data in CSV format
import csv
# For parsing the dates received from twitter in readable formats
import datetime
import dateutil.parser
import unicodedata
# To add wait time between requests
import time

from environment_variables import get_bearer_token


def create_headers():
    headers = {"Authorization": "Bearer {}".format(get_bearer_token)}
    return headers


def create_url(keyword, start_date, end_date, max_results=10):
    # API endpoint in twitter api
    search_url = "https://api.twitter.com/2/tweets/search/all"

    # query parameters based on the endpoint
    query_params = {'query': keyword,
                    'start_time': start_date,
                    'end_time': end_date,
                    'max_results': max_results,
                    'expansions': 'author_id,in_reply_to_user_id,geo.place_id',
                    'tweet.fields': 'id,text,author_id,in_reply_to_user_id,geo,conversation_id,created_at,lang,'
                                    'public_metrics,referenced_tweets,reply_settings,source',
                    'user.fields': 'id,name,username,created_at,description,public_metrics,verified',
                    'place.fields': 'full_name,id,country,country_code,geo,name,place_type',
                    'next_token': {}}

    return search_url, query_params
