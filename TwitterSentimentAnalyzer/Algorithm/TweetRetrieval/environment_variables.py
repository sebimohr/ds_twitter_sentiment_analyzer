from dotenv import load_dotenv
import os


def load_dot_env():
    load_dotenv()


def get_bearer_token():
    load_dot_env()
    bearer_token = os.environ.get('TWITTER_BEARER_TOKEN')
    return bearer_token
