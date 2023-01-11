import React from "react";
import {
    TextField,
    Button,
    Stack,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton, Typography, Slider, Tooltip
} from "@mui/material";
import { HashtagProps } from "./hashtag-props";

const sliderMarks = [
    {
        value: 20,
        label: "20 Tweets"
    },
    {
        value: 50,
        label: "50 Tweets"
    },
    {
        value: 100,
        label: "100 Tweets"
    },
    {
        value: 200,
        label: "200 Tweets"
    },
]

export default function ChooseEventHashtag(props: HashtagProps) {
    const [hashtag, setHashtag] = [props.hashtag, props.setHashtag];
    const [useCachedData, setUseCachedData] = [props.useCachedData, props.setUseCachedData];
    const [tweetCount, setTweetCount] = [props.tweetCount, props.setTweetCount];

    const handleHashtagChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value)
    }

    const handleTweetCountChanged = (event: Event, newValue: number | number[]) => {
        setTweetCount(newValue)
    }

    const handleUseCachedDataChanged = (
        event: React.MouseEvent<HTMLElement>,
        useCache: boolean
    ) => {
        if (useCache != null)
            setUseCachedData(useCache)
    }

    const handleSubmitButtonClicked = () => {
        props.changeIsShown();
    }

    const sliderText = (value: number) => {
        return `${value} Tweets`
    }

    const tweetCountSlider = <Slider
        aria-label="tweet_count"
        defaultValue={tweetCount}
        onChange={handleTweetCountChanged}
        min={20}
        max={200}
        getAriaValueText={sliderText}
        step={null}
        valueLabelDisplay="auto"
        marks={sliderMarks}
        disabled={useCachedData}
        sx={{
            marginBottom: 8
        }}
    />;

    return (
        <div>
            {props.isShown && <Stack sx={{width: 600}}>
                <Typography variant="body1"
                            align="justify"
                            gutterBottom
                            sx={{
                                marginBottom: 4
                            }}>
                    The Twitter Sentiment Analyzer can analyze tweets for a specific event.
                    Just type in a hashtag below and submit the form to see the sentiment analysis, along with the top
                    hashtags and users that were found in the analyzed data set.
                </Typography>
                <Typography variant="overline">Which hashtag do you want to analyze?</Typography>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Hashtag"
                    InputProps={{
                        // for permanent hashtag at the beginning of the textfield
                        startAdornment: <InputAdornment position="start">#</InputAdornment>
                    }}
                    variant="outlined"
                    value={hashtag}
                    onChange={handleHashtagChanged}
                    sx={{
                        marginBottom: 4
                    }}
                    helperText="The hashtag has to be at least 3 characters long"
                />
                <Typography variant="overline">Which data source do you want to use?</Typography>
                <ToggleButtonGroup
                    value={useCachedData}
                    exclusive
                    onChange={handleUseCachedDataChanged}
                    aria-label="data source"
                    sx={{
                        marginBottom: 4
                    }}>
                    <ToggleButton
                        value={true}
                        sx={{
                            width: '50%'
                        }}>
                        Cached
                    </ToggleButton>
                    <ToggleButton
                        value={false}
                        sx={{
                            width: '50%'
                        }}>
                        New Query
                    </ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="overline">
                    How many tweets should be analyzed?
                </Typography>
                {useCachedData ?
                    <Tooltip
                        title={<Typography variant="caption" align="center">Cached data has a fixed amount of analyzed
                            tweets, therefore you can't change the value</Typography>} placement="top">
                        <span>
                            {tweetCountSlider}
                        </span>
                    </Tooltip> : tweetCountSlider}
                <Button
                    variant="outlined"
                    onClick={handleSubmitButtonClicked}
                    size="large"
                    sx={{
                        width: '100%',
                        marginTop: 2
                    }}
                    disabled={hashtag.length < 3}>Submit</Button>
            </Stack>}
        </div>
    )
}