import React from "react";
import {
    TextField,
    Button,
    Stack,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton, Typography
} from "@mui/material";

export default function ChooseEventHashtag() {
    const [hashtag, setHashtag] = React.useState<string>("");
    const [useCachedData, setUseCachedData] = React.useState<boolean>(true)

    const handleHashtagChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value)
    };

    const handleUseCachedDataChanged = (
        event: React.MouseEvent<HTMLElement>,
        newDataSource: boolean
    ) => {
        setUseCachedData(newDataSource)
    }

    return (
        <div>
            <Stack>
                <Typography
                    sx={{
                        width: 300
                    }}>
                    Please enter the hashtag of the event you want to search for.
                </Typography>
                <TextField
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
                        width: 300,
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
                            width: 150
                        }}>
                        Cached
                    </ToggleButton>
                    <ToggleButton
                        value={false}
                        sx={{
                            width: 150
                        }}>
                        New Query
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button
                    variant="outlined"
                    sx={{
                        width: 300
                    }}>Absenden</Button>
            </Stack>
        </div>
    )
}