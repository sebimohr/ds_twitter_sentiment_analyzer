import './App.css';
import React from "react";
import ChooseEventHashtag from "./StartScreen/choose-event-hashtag";
import ThemeHelper from "./Infrastructure/theme-helper";
import SentimentScreen from "./SentimentScreen/sentiment-screen";
import LoadingBackdrop from "./StartScreen/loading-backdrop";
import axios from "axios";
import ErrorSnackbar from "./StartScreen/error-snackbar";
import { responsiveProperty } from "@mui/material/styles/cssUtils";

const backendApiUrl = "http://127.0.0.1:9001";

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function App() {
    const [hashtag, setHashtag] = React.useState<string>('');
    const [useCachedData, setUseCachedData] = React.useState<boolean>(true);
    const [hashtagScreenIsShown, setHashtagScreenIsShown] = React.useState<boolean>(true);
    const [loadingScreenIsShown, setLoadingScreenIsShown] = React.useState<boolean>(false);
    const [errorSnackbarIsShown, setErrorSnackbarIsShown] = React.useState<boolean>(false);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = React.useState<string>('');
    const [sentimentScreenIsShown, setSentimentScreenIsShown] = React.useState<boolean>(false);

    const hashtagScreenSubmission = async () => {
        setLoadingScreenIsShown(true);

        /*await axios.get(backendApiUrl + '/api/sentiment', {
            params: {
                hashtag: hashtag,
                cache: useCachedData
            }
        })
            .then(function (response) {
                setLoadingScreenIsShown(false);
                setHashtagScreenIsShown(false);
                setSentimentScreenIsShown(true);
            })
            .catch(function (_) {
                setLoadingScreenIsShown(false);
                setErrorSnackbarMessage("Couldn't retrieve data, please try again or inform your system administrator.")
                setErrorSnackbarIsShown(true);
                return;
            })*/

        await sleep(1000);


        setLoadingScreenIsShown(false);
        setHashtagScreenIsShown(false);
        setSentimentScreenIsShown(true);
    }

    return (
        <div className="App">
            <ThemeHelper>
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
                    changeIsShown={setSentimentScreenIsShown}/>
                <LoadingBackdrop
                    showDialog={loadingScreenIsShown}/>
                <ErrorSnackbar
                    openErrorSnackbar={errorSnackbarIsShown}
                    changeOpenErrorSnackbar={setErrorSnackbarIsShown}
                    errorMessage={errorSnackbarMessage}/>
            </ThemeHelper>
        </div>
    );
}
