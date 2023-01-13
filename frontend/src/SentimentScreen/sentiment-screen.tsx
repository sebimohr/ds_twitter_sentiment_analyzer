import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { SentimentProps } from "./sentiment-props";
import { CanvasJSChart, ChartSettings } from "./chart-settings";
import SentimentScreenList from "./sentiment-screen-list";

const Chart = CanvasJSChart;

export default function SentimentScreen(props: SentimentProps) {
    const hashtag = props.hashtag;
    const tweetsList = props.tweetsList;
    let [positiveCount, neutralCount, negativeCount] = [0, 0, 0]

    tweetsList.forEach(tweet => {
        if (tweet.sentiment.sentiment_rating_value > 0)
            positiveCount++;
        else if (tweet.sentiment.sentiment_rating_value < 0) {
            negativeCount++;
        } else
            neutralCount++;
    })

    return (
        <div>
            {props.isShown && <Stack spacing={2} sx={{width: 1000}}>
                <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">your Event:</InputAdornment>,
                    }}
                    inputProps={{style: {textAlign: 'center'}}}
                    variant="outlined"
                    value={"#" + hashtag}
                    sx={{
                        marginTop: 2,
                        marginBottom: 2
                    }}
                />
                <Stack>
                    <Typography variant="h4" align="center">
                        Sentiment Analysis
                    </Typography>
                    <Chart options={ChartSettings(positiveCount, neutralCount, negativeCount)}/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <SentimentScreenList
                        isHashtagList={true}
                        listToShow={props.topHashtagsList}
                        showSkeleton={!(props.topHashtagsList.length > 0)}
                        showSnackbar={props.showSnackbar}
                        hashtag={hashtag}/>
                    <SentimentScreenList
                        isHashtagList={false}
                        listToShow={props.topUsersList}
                        showSkeleton={!(props.topUsersList.length > 0)}
                        showSnackbar={props.showSnackbar}
                        hashtag={hashtag}/>
                </Stack>
            </Stack>}
        </div>
    )
}