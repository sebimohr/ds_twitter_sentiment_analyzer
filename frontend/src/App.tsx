import './App.css';
import React from "react";
import ChooseEventHashtag from "./StartScreen/choose-event-hashtag";
import ThemeHelper from "./theme-helper";

export default function App() {
    return (
        <div className="App">
            <ThemeHelper>
                <ChooseEventHashtag/>
            </ThemeHelper>
        </div>
    );
}
