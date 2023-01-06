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

const backendApiUrl = "http://127.0.0.1:9001";

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function App() {
    const [hashtag, setHashtag] = React.useState<string>('');
    const [useCachedData, setUseCachedData] = React.useState<boolean>(true);
    const [tweetList, setTweetList] = React.useState<Tweet[]>([]);

    const [hashtagScreenIsShown, setHashtagScreenIsShown] = React.useState<boolean>(true);
    const [loadingScreenIsShown, setLoadingScreenIsShown] = React.useState<boolean>(false);

    const [snackbarIsShown, setSnackbarIsShown] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [snackbarIsError, setSnackbarIsError] = React.useState<boolean>(false);

    const [sentimentScreenIsShown, setSentimentScreenIsShown] = React.useState<boolean>(false);

    const showSnackbar = (message: string, isFatalError: boolean) => {
        setSnackbarIsShown(true);
        setSnackbarMessage(message);
        setSnackbarIsError(isFatalError);
    }

    const hashtagScreenSubmission = async () => {
        setLoadingScreenIsShown(true);

        await axios.get(backendApiUrl + '/api/sentiment', {
            params: {
                hashtag: hashtag,
                cache: useCachedData
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    responseFailure(
                        `The server denied your request, please try again or inform your system administrator`,
                        true,
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
                        false,
                        "Retrieved list of tweets was empty.")
                }
            })
            .catch(error => responseFailure(
                "Server couldn't be reached, please inform your system administrator",
                true,
                error));
    }

    const responseFailure = (clientErrorMessage: string, isError: boolean, logMessage: string) => {
        setLoadingScreenIsShown(false);
        showSnackbar(clientErrorMessage, isError);
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
                            isFatalError={snackbarIsError}/>
                    </div>
                </Stack>
            </ThemeHelper>
        </div>
    );
}
