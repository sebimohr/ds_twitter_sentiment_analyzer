import os

from dotenv import load_dotenv


class EnvironmentVariablesHelper:
    def __init__(self):
        """ loads environment variable from .env-file """
        load_dotenv()

    @staticmethod
    def GetBearerToken() -> str:
        """ loads twitter_bearer_token value from environment variables """
        bearer_token: str = os.environ.get('TWITTER_BEARER_TOKEN')
        return bearer_token
