from dotenv import load_dotenv
import os


def get_bearer_token():
    # loads environment variable from .env-file
    load_dotenv()

    # loads twitter_bearer_token value from environment variables 
    bearer_token = os.environ.get('TWITTER_BEARER_TOKEN')
    return bearer_token
