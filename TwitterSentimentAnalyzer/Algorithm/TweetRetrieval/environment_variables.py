import string

from dotenv import load_dotenv
import os


def getBearerToken():
    # loads environment variable from .env-file
    load_dotenv()

    # loads twitter_bearer_token value from environment variables 
    bearer_token: string = os.environ.get('TWITTER_BEARER_TOKEN')
    return bearer_token
