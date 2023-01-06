import React from "react";
import {
    TextField,
    Button,
    Stack,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton, Typography
} from "@mui/material";
import { HashtagProps } from "./hashtag-props";

export default function ChooseEventHashtag(props: HashtagProps) {
    const [hashtag, setHashtag] = [props.hashtag, props.setHashtag];
    const [useCachedData, setUseCachedData] = [props.useCachedData, props.setUseCachedData];

    const handleHashtagChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value)
    }

    const handleUseCachedDataChanged = (
        event: React.MouseEvent<HTMLElement>,
        useCache: boolean
    ) => {
        setUseCachedData(useCache)
    }

    const handleSubmitButtonClicked = () => {
        props.changeIsShown();
    }

    return (
        <div>
            {props.isShown && <Stack sx={{width: 500}}>
                <Typography variant="h6" gutterBottom style={{textAlign: "center"}}>
                    Please enter the hashtag of the event you want to search for.
                </Typography>
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
                        marginTop: 2,
                        marginBottom: 2
                    }}
                />
                <ToggleButtonGroup
                    value={useCachedData}
                    exclusive
                    onChange={handleUseCachedDataChanged}
                    aria-label="data source"
                    sx={{
                        marginBottom: 2
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
                <Button
                    variant="outlined"
                    onClick={handleSubmitButtonClicked}
                    sx={{
                        width: '100%'
                    }}>Submit</Button>
            </Stack>}
        </div>
    )
}