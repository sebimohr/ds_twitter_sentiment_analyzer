import './App.css';
import React from "react";
import ChooseEventHashtag from "./StartScreen/choose-event-hashtag";
import ThemeHelper from "./Infrastructure/theme-helper";
import SentimentScreen from "./SentimentScreen/sentiment-screen";
import LoadingBackdrop from "./StartScreen/loading-backdrop";
import axios from "axios";
import MessageSnackbar from "./StartScreen/message-snackbar";
import { Stack } from "@mui/material";
import { Tweet } from "./SentimentScreen/tweet";
import { SnackbarSeverity } from "./Infrastructure/snackbar-severity";

const backendApiUrl = "http://127.0.0.1:9001";

export default function App() {
    const [hashtag, setHashtag] = React.useState<string>('');
    const [useCachedData, setUseCachedData] = React.useState<boolean>(true);
    const [tweetList, setTweetList] = React.useState<Tweet[]>([]);

    const [hashtagScreenIsShown, setHashtagScreenIsShown] = React.useState<boolean>(true);
    const [loadingScreenIsShown, setLoadingScreenIsShown] = React.useState<boolean>(false);

    const [snackbarIsShown, setSnackbarIsShown] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<SnackbarSeverity>(SnackbarSeverity.Success);

    const [sentimentScreenIsShown, setSentimentScreenIsShown] = React.useState<boolean>(false);

    const showSnackbar = (message: string, severity: SnackbarSeverity) => {
        setSnackbarIsShown(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }

    const hashtagScreenSubmission = async () => {
        setLoadingScreenIsShown(true);

        await axios.get(backendApiUrl + '/api/sentiment', {
            params: {
                hashtag: hashtag ?? "x",
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
                    setTweetList(tweets);
                    setLoadingScreenIsShown(false);
                    setHashtagScreenIsShown(false);
                    setSentimentScreenIsShown(true);
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

    const responseFailure = (clientErrorMessage: string, severity: SnackbarSeverity, logMessage: string) => {
        setLoadingScreenIsShown(false);
        showSnackbar(clientErrorMessage, severity);
        console.log(logMessage);
    }

    return (
        <div className="App">
            <ThemeHelper>
                <Stack>
                    {/*<NavigationBar/>*/}
                    <div>
                        <ChooseEventHashtag
                            hashtag={hashtag}
                            setHashtag={setHashtag}
                            useCachedData={useCachedData}
                            setUseCachedData={setUseCachedData}
                            isShown={hashtagScreenIsShown}
                            changeIsShown={hashtagScreenSubmission}/>
                        <SentimentScreen
                            hashtag={hashtag}
                            isShown={sentimentScreenIsShown}
                            changeIsShown={setSentimentScreenIsShown}
                            tweetsList={tweetList}/>
                        <LoadingBackdrop
                            showDialog={loadingScreenIsShown}/>
                        <MessageSnackbar
                            openErrorSnackbar={snackbarIsShown}
                            changeOpenErrorSnackbar={setSnackbarIsShown}
                            errorMessage={snackbarMessage}
                            errorCode={snackbarSeverity}/>
                    </div>
                </Stack>
            </ThemeHelper>
        </div>
    );
}
