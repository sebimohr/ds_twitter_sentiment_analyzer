import axios from "axios";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";
import { Tweet } from "../SentimentScreen/tweet";
import { SentimentScreenListItem } from "../SentimentScreen/sentiment-screen-list-item";
import { User } from "../SentimentScreen/user";

const backendApiUrl = "http://127.0.0.1:9001";

export class AxiosClient {
    backendApiUrl: string;

    constructor() {
        this.backendApiUrl = backendApiUrl;
    }

    async GetTweetsWithSentiment(hashtag: string,
                                 useCachedData: boolean,
                                 tweetCount: number,
                                 responseFailure: Function,
                                 responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/sentiment', {
            params: {
                hashtag: hashtag,
                cache: useCachedData,
                tweet_count: tweetCount
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (!CheckIfStatusCodeIsOK(
                    response.status,
                    responseFailure,
                    "The server denied your request because of invalid input"))
                    return;

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
                return BasicRequestFailure(responseFailure, error);
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
                if (!CheckIfStatusCodeIsOK(
                    response.status,
                    responseFailure,
                    "The server denied your request for top hashtags and users, the cached data might have been deleted in the meantime"))
                    return;

                let top_hashtags = response.data.hashtags as SentimentScreenListItem[];
                let top_users = response.data.users as SentimentScreenListItem[];
                if (top_hashtags.length > 0 || top_users.length > 0) {
                    responseSuccess(top_hashtags, top_users)
                } else {
                    responseFailure(
                        "Couldn't request top hashtags or users, the cached data might have been deleted in the meantime",
                        SnackbarSeverity.Info,
                        "Retrieved list of top hashtags or users was empty.")
                }
            })
            .catch(error => {
                return BasicRequestFailure(responseFailure, error);
            });
    }

    async GetUserInformation(user_id: string,
                             hashtag: string,
                             responseFailure: Function,
                             responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/user', {
            params: {
                user_id: user_id,
                hashtag: hashtag
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (!CheckIfStatusCodeIsOK(response.status, responseFailure, null))
                    return;

                let user = response.data.user as User;
                if (user != null) {
                    responseSuccess(user)
                } else {
                    responseFailure(
                        "Couldn't request user information, the user might be deleted or banned on Twitter",
                        SnackbarSeverity.Info,
                        "User information was empty.")
                }
            })
            .catch(error => {
                return BasicRequestFailure(responseFailure, error);
            });
    }

    async GetUserFollowers(user_id: string,
                           responseFailure: Function,
                           responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/user/followers', {
            params: {
                user_id: user_id,
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (!CheckIfStatusCodeIsOK(response.status, responseFailure, null))
                    return;

                let users = response.data.users as User[];
                responseSuccess(users)
            })
            .catch(error => {
                return BasicRequestFailure(responseFailure, error);
            });
    }

    async GetUserTweets(user_id: string,
                        responseFailure: Function,
                        responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/user/tweets', {
            params: {
                user_id: user_id,
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (!CheckIfStatusCodeIsOK(response.status, responseFailure, null))
                    return;

                let tweets = response.data.tweets as Tweet[];
                responseSuccess(tweets)
            })
            .catch(error => {
                return BasicRequestFailure(responseFailure, error);
            });
    }

    async GetHashtagTweets(main_hashtag: string,
                           search_hashtag: string,
                           responseFailure: Function,
                           responseSuccess: Function) {
        await axios.get(this.backendApiUrl + '/api/hashtag', {
            params: {
                hashtag: main_hashtag,
                search_tag: search_hashtag
            },
            validateStatus: function (status) {
                return status <= 404;
            }
        })
            .then(response => {
                if (!CheckIfStatusCodeIsOK(response.status, responseFailure, null))
                    return;

                let tweets = response.data.tweets as Tweet[];
                responseSuccess(tweets)
            })
            .catch(error => {
                return BasicRequestFailure(responseFailure, error);
            });
    }
}

function CheckIfStatusCodeIsOK(statusCode: number,
                               responseFailure: Function,
                               alternate400ErrorMessage: string | null) {
    if (statusCode !== 200) {
        let clientErrorMessage: string

        if (statusCode === 400) {
            clientErrorMessage = alternate400ErrorMessage ?? "The server denied your request for user information"
        } else {
            clientErrorMessage = "The server denied your request, please try again or inform your system administrator"
        }
        responseFailure(
            clientErrorMessage,
            SnackbarSeverity.Warning,
            `Expected status code 200, was ${statusCode} instead.`)
        return false;
    } else {
        return true;
    }
}

function BasicRequestFailure(responseFailure: Function, error: any) {
    return RequestWasUnsuccessful(
        responseFailure,
        SnackbarSeverity.Error,
        error,
        null
    )
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