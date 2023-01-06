import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { SentimentProps } from "./sentiment-props";
import { CanvasJSChart, ChartSettings } from "./chart-settings";
import SentimentScreenList from "./sentiment-screen-list";
import { SentimentScreenListItem } from "./sentiment-screen-list-item";

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

    const test_list : SentimentScreenListItem[] = [
        {"id": "1", "main_text": "oben text", "sub_text": "unten text", "sentiment": -0.5},
        {"id": "2", "main_text": "oben2 text", "sub_text": "unten2 text", "sentiment": -1},
        {"id": "3", "main_text": "oben3 text", "sub_text": "unten3 text", "sentiment": 1},
        {"id": "4", "main_text": "oben4 text", "sub_text": "unten4 text", "sentiment": 0.5},
        {"id": "5", "main_text": "oben5 text", "sub_text": "unten5 text", "sentiment": 0},
    ]

    return (
        <div>
            {props.isShown && <Stack spacing={2} sx={{width: 1000}}>
                <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">your Event: #</InputAdornment>,
                    }}
                    inputProps={{style: {textAlign: 'center'}}}
                    variant="outlined"
                    value={hashtag}
                    sx={{
                        marginTop: 2,
                        marginBottom: 2
                    }}
                />
                <Stack>
                    <Typography>
                        Sentiment Analysis
                    </Typography>
                    <Chart options={ChartSettings(positiveCount, neutralCount, negativeCount)}/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <SentimentScreenList isHashtagList={true} listToShow={test_list}/>
                    <SentimentScreenList isHashtagList={false} listToShow={test_list}/>
                </Stack>
            </Stack>}
        </div>
    )
}