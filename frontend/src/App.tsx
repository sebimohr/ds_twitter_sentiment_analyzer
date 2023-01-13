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
import { SentimentScreenListItem } from "./SentimentScreen/sentiment-screen-list-item";
import NavigationBar from "./Infrastructure/navigation-bar";

const client = new AxiosClient();

export default function App() {
    const [hashtag, setHashtag] = React.useState<string>('');
    const [useCachedData, setUseCachedData] = React.useState<boolean>(true);
    const [tweetCount, setTweetCount] = React.useState<number>(50);

    const [hashtagScreenIsShown, setHashtagScreenIsShown] = React.useState<boolean>(true);
    const [loadingScreenIsShown, setLoadingScreenIsShown] = React.useState<boolean>(false);

    const [snackbarIsShown, setSnackbarIsShown] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<SnackbarSeverity>(SnackbarSeverity.Success);

    const [tweetList, setTweetList] = React.useState<Tweet[]>([]);
    const [topHashtagsList, setTopHashtagsList] = React.useState<SentimentScreenListItem[]>([]);
    const [topUsersList, setTopUsersList] = React.useState<SentimentScreenListItem[]>([]);
    const [sentimentScreenIsShown, setSentimentScreenIsShown] = React.useState<boolean>(false);

    const [showBackButton, setShowBackButton] = React.useState<boolean>(false);

    const backButtonPressed = () => {
        setShowBackButton(false);
        setHashtagScreenIsShown(true);
        setSentimentScreenIsShown(false);
        setTweetList([]);
        setTopHashtagsList([])
        setTopUsersList([])
    }

    const showSnackbar = (message: string, severity: SnackbarSeverity, logMessage: string) => {
        setSnackbarIsShown(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        if (logMessage.length > 0)
            console.log(logMessage);
    }

    const hashtagScreenSubmission = async () => {
        setLoadingScreenIsShown(true);

        await client.GetTweetsWithSentiment(hashtag,
            useCachedData,
            tweetCount,
            (clientErrorMessage: string,
             severity: SnackbarSeverity,
             logMessage: string) => {
                setLoadingScreenIsShown(false);
                showSnackbar(clientErrorMessage, severity, logMessage);
            },
            async (tweets: Tweet[]) => {
                setTweetList(tweets);
                setLoadingScreenIsShown(false);
                setHashtagScreenIsShown(false);
                setSentimentScreenIsShown(true);
                setShowBackButton(true);
                await requestTopHashtagsAndUsers()
            });
    }

    const requestTopHashtagsAndUsers = async () => {
        await client.GetTopHashtagsAndUsers(hashtag,
            (clientErrorMessage: string,
             severity: SnackbarSeverity,
             logMessage: string) =>
                showSnackbar(clientErrorMessage, severity, logMessage),
            (topHashtags: SentimentScreenListItem[],
             topUsers: SentimentScreenListItem[]) => {
                setTopHashtagsList(topHashtags);
                setTopUsersList(topUsers);
            });
    }

    return (
        <div className="App">
            <ThemeHelper>
                <Stack spacing={2}>
                    <NavigationBar
                        showBackButton={showBackButton}
                        backButtonFunction={backButtonPressed}/>
                    <div>
                        <ChooseEventHashtag
                            hashtag={hashtag}
                            setHashtag={setHashtag}
                            useCachedData={useCachedData}
                            setUseCachedData={setUseCachedData}
                            tweetCount={tweetCount}
                            setTweetCount={setTweetCount}
                            isShown={hashtagScreenIsShown}
                            changeIsShown={hashtagScreenSubmission}/>
                        <SentimentScreen
                            hashtag={hashtag}
                            isShown={sentimentScreenIsShown}
                            changeIsShown={setSentimentScreenIsShown}
                            tweetsList={tweetList}
                            topHashtagsList={topHashtagsList}
                            topUsersList={topUsersList}
                            showSnackbar={showSnackbar}/>
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
