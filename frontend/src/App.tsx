import './App.css';
import React from "react";
import ChooseEventHashtag from "./StartScreen/choose-event-hashtag";
import ThemeHelper from "./Infrastructure/theme-helper";
import SentimentScreen from "./SentimentScreen/sentiment-screen";
import LoadingBackdrop from "./StartScreen/loading-backdrop";
import MessageSnackbar from "./StartScreen/message-snackbar";
import { Stack } from "@mui/material";
import { Tweet } from "./SentimentScreen/tweet";
import { SnackbarSeverity } from "./Infrastructure/snackbar-severity";
import { AxiosClient } from "./Client/axios-client";

const backendApiUrl = "http://127.0.0.1:9001";
const client = new AxiosClient(backendApiUrl);

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

        await client.GetTweetsWithSentiment(hashtag,
            useCachedData,
            (clientErrorMessage: string, severity: SnackbarSeverity, logMessage: string) => {
                setLoadingScreenIsShown(false);
                showSnackbar(clientErrorMessage, severity);
                console.log(logMessage);
            },
            (tweets: Tweet[]) => {
                setTweetList(tweets);
                setLoadingScreenIsShown(false);
                setHashtagScreenIsShown(false);
                setSentimentScreenIsShown(true);
            });
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
