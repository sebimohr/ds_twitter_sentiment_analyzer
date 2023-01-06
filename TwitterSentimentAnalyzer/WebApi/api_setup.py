from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from WebApi.Endpoints.get_followers_endpoint import GetFollowersEndpoint
from WebApi.Endpoints.get_top_hashtags_and_users_endpoint import GetTopHashtagsAndUsersEndpoint
from WebApi.Endpoints.sentiment_analysis_endpoint import GetSentimentAnalysisEndpoint


class ApiSetup:
    app: Flask
    api: Api
    port: int

    def __init__(self, port: int):
        """ initialize the api with the number where it should run on """
        self.app = Flask(__name__)
        CORS(self.app)
        self.api = Api(self.app)
        self.port = port

    def RegisterApiEndpoints(self):
        """ registers all api endpoints """
        self.api.add_resource(GetSentimentAnalysisEndpoint, '/api/sentiment')
        self.api.add_resource(GetFollowersEndpoint, '/api/followers')
        self.api.add_resource(GetTopHashtagsAndUsersEndpoint, '/api/top')
        return self

    def RunApi(self):
        """ starts the api on the specified localhost port """
        print("Starting TwitterSentimentAnalyzer")
        self.app.run(debug = True, port = self.port)
        return self
