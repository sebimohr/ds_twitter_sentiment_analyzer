import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { SentimentProps } from "./sentiment-props";
import CanvasJSReact from "../CanvasJsLibrary/canvasjs.react";


export default function SentimentScreen(props: SentimentProps) {
    const hashtag = props.hashtag;
    const [isShown, setIsShown] = [props.isShown, props.changeIsShown];

    // import canvasJSChart from canvasjs library
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const canvasJsOptions = {
        animationEnabled: true,
        title: {
            text: "Sentiment Analysis of Tweets"
        },
        data: [{
            type: "doughnut",
            showInLegend: true,
            toolTipContent: "{sentiment}: {percentage}%",
            indexLabel: "{count}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                {sentiment: "Positive", percentage: 10, count: 5},
                {sentiment: "Neutral", percentage: 26, count: 13},
                {sentiment: "Negative", percentage: 64, count: 32}
            ]
        }]
    }

    return (
        <div>
            isShown && <Stack spacing={2}>
            <TextField
                id="outlined-read-only-input"
                InputProps={{
                    startAdornment: <InputAdornment position="start">your Event: #</InputAdornment>
                }}
                variant="outlined"
                value={hashtag}
                sx={{
                    width: 500,
                    marginTop: 2,
                    marginBottom: 2
                }}
            />
            <Stack>
                <Typography sx={{width: 500}}>
                    Sentiment Analysis
                </Typography>
                <CanvasJSChart options={canvasJsOptions}/>
            </Stack>
        </Stack>
        </div>
    )
}