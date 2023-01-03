import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { SentimentProps } from "./sentiment-props";
import CanvasJSReact from "../CanvasJsLibrary/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
CanvasJS.addColorSet("customColorSet", ["#559E55", "#8F8F88", "#BF5250"])

export default function SentimentScreen(props: SentimentProps) {
    const hashtag = props.hashtag;
    // TODO: isShown must be bound to a function
    const setIsShown = props.changeIsShown;

    const [positiveCount, neutralCount, negativeCount] = [5, 13, 32]

    const toolTip = (count: number): string => {
        return count.toString() + " Tweets";
    }

    // import canvasJSChart from canvasjs library
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    CanvasJS.addTheme()
    const canvasJsOptions = {
        animationEnabled: true,
        colorSet: "customColorSet",
        data: [{
            type: "pie",
            // toolTipContent: "{sentiment}: {percentage}%",
            indexLabel: "{name}: {y}%",
            // indexLabelPlacement: "inside",
            startAngle: -90,
            dataPoints: [
                {name: "Positive", y: 10, toolTipContent: toolTip(positiveCount)},
                {name: "Neutral", y: 26, toolTipContent: toolTip(neutralCount)},
                {name: "Negative", y: 64, toolTipContent: toolTip(negativeCount)}
            ]
        }]
    }

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
                    <CanvasJSChart options={canvasJsOptions}/>
                </Stack>
            </Stack>}
        </div>
    )
}