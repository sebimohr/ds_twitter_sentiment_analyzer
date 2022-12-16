import string
import tweepy

from textblob import TextBlob
import sys
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import nltk
import pycountry
import re

from wordcloud import WordCloud, STOPWORDS
from PIL import Image
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from langdetect import detect
from nltk.stem import SnowballStemmer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer

from environment_variables import get_bearer_token


def build_tweepy_client():
    client = tweepy.Client(bearer_token=get_bearer_token())
    return client


def get_tweets_by_hashtag(client: tweepy.Client, hashtag: string, max_results=50):
    hashtag.strip()
    if hashtag[0] != '#':
        hashtag = "#" + hashtag

    query = f'{hashtag} -is:retweet lang:en'

    tweets = client.search_recent_tweets(query=query, max_results=max_results)

    return tweets
