import './App.css';
import React from "react";
import ChooseEventHashtag from "./StartScreen/choose-event-hashtag";
import ThemeHelper from "./Infrastructure/theme-helper";
import SentimentScreen from "./SentimentScreen/sentiment-screen";

export default function App() {
    const [hashtag, setHashtag] = React.useState<string>("");
    const [hashtagScreenIsShown, setHashtagScreenIsShown] = React.useState<boolean>(true);

    const [sentimentScreenIsShown, setSentimentScreenIsShown] = React.useState<boolean>(false);

    const hashtagScreenSubmission = () => {
        setHashtagScreenIsShown(false);
        setSentimentScreenIsShown(true);
    }

    return (
        <div className="App">
            <ThemeHelper>
                <ChooseEventHashtag
                    hashtag={hashtag}
                    setHashtag={setHashtag}
                    isShown={hashtagScreenIsShown}
                    changeIsShown={hashtagScreenSubmission}/>
                <SentimentScreen
                    hashtag={hashtag}
                    isShown={sentimentScreenIsShown}
                    changeIsShown={setSentimentScreenIsShown}/>
            </ThemeHelper>
        </div>
    );
}
