import axios from "axios";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";
import { Tweet } from "../SentimentScreen/tweet";
import { SentimentScreenListItem } from "../SentimentScreen/sentiment-screen-list-item";

export class AxiosClient {
    backendApiUrl: string;

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
                return RequestWasUnsuccessful(
                    responseFailure,
                    SnackbarSeverity.Error,
                    error,
                    null
                )
            });
    }

    async GetTopHashtagsAndUsers(hashtag: string,
                                 responseFailure: Function,
                                 responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/top', {
            params: {
                hashtag: hashtag,
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    let clientErrorMessage: string

                    if (response.status === 400) {
                        clientErrorMessage = "The server denied your request for top hashtags and users, the cached data might have been deleted in the meantime"
                    } else {
                        clientErrorMessage = "The server denied your request, please try again or inform your system administrator"
                    }
                    responseFailure(
                        clientErrorMessage,
                        SnackbarSeverity.Warning,
                        `Expected status code 200, was ${response.status} instead.`)
                    return;
                }

                let top_hashtags = response.data.hashtags as SentimentScreenListItem[];
                let top_users = response.data.users as SentimentScreenListItem[];
                if (top_hashtags.length > 0 && top_users.length > 0) {
                    responseSuccess(top_hashtags, top_users)
                } else {
                    responseFailure(
                        "Couldn't request top hashtags or users, the cached data might have been deleted in the meantime",
                        SnackbarSeverity.Info,
                        "Retrieved list of top hashtags or users was empty.")
                }
            })
            .catch(error => {
                return RequestWasUnsuccessful(
                    responseFailure,
                    SnackbarSeverity.Error,
                    error,
                    null
                )
            });
    }
}

function RequestWasUnsuccessful(responseFailure: Function,
                                snackbarSeverity: SnackbarSeverity,
                                error: any,
                                clientErrorMessage: string | null) {
    if (snackbarSeverity === SnackbarSeverity.Error) {
        clientErrorMessage = "Server couldn't be reached, please inform your system administrator"
    }

    return responseFailure(
        clientErrorMessage,
        snackbarSeverity,
        error.toJSON());
}