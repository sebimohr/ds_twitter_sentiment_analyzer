import axios from "axios";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";
import { Tweet } from "../SentimentScreen/tweet";

export class AxiosClient {
    backendApiUrl :string;

    constructor(backendUrl: string) {
        this.backendApiUrl = backendUrl;
    }

    async GetTweetsWithSentiment(hashtag: string,
                                 useCachedData: boolean,
                                 responseFailure: Function,
                                 responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/sentiment', {
            params: {
                hashtag: hashtag,
                cache: useCachedData
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    let clientErrorMessage: string

                    if (response.status === 400) {
                        clientErrorMessage = "The server denied your request because of invalid input"
                    } else {
                        clientErrorMessage = "The server denied your request, please try again or inform your system administrator"
                    }
                    responseFailure(
                        clientErrorMessage,
                        SnackbarSeverity.Warning,
                        `Expected status code 200, was ${response.status} instead.`)
                    return;
                }

                console.log(response.data.tweets);

                let tweets = response.data.tweets as Tweet[];
                if (tweets.length > 0) {
                    responseSuccess(tweets)
                } else {
                    responseFailure(
                        "No tweets could be retrieved, please try again with a different value",
                        SnackbarSeverity.Info,
                        "Retrieved list of tweets was empty.")
                }
            })
            .catch(error => {
                let clientErrorMessage: string;
                clientErrorMessage = "Server couldn't be reached, please inform your system administrator";

                return responseFailure(
                    clientErrorMessage,
                    SnackbarSeverity.Error,
                    error.toJSON());
            });
    }
}