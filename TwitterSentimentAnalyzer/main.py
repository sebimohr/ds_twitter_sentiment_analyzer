from flask import Flask
from flask_restful import Api

from WebApi.Endpoints.get_followers_endpoint import GetFollowersEndpoint
from WebApi.Endpoints.sentiment_analysis_endpoint import SentimentAnalysisEndpoint


class Main:
    app: Flask
    api: Api

    def __init__(self):
        self.app = Flask(__name__)
        self.api = Api(self.app)

    def RegisterApiEndpoints(self):
        self.api.add_resource(SentimentAnalysisEndpoint, '/api/sentiment')
        self.api.add_resource(GetFollowersEndpoint, '/api/followers')
        return self

    def RunApi(self):
        print("Starting TwitterSentimentAnalyzer")
        self.app.run(debug = True)
        return self


if __name__ == '__main__':
    main_api = Main()
    main_api.RegisterApiEndpoints().RunApi()
