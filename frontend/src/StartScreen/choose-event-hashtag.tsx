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
    const [dataSource, setDataSource] = React.useState<string>('new_query')

    const handleHashtagChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value)
    };

    const handleDataSourceToggle = (
        event: React.MouseEvent<HTMLElement>,
        newDataSource: string
    ) => {
        setDataSource(newDataSource)
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
                ></TextField>
                <ToggleButtonGroup
                    value={dataSource}
                    exclusive
                    onChange={handleDataSourceToggle}
                    aria-label="data source"
                    sx={{
                        marginBottom: 2
                    }}>
                    <ToggleButton
                        value="cached"
                        sx={{
                            width: 150
                        }}>
                        Cached
                    </ToggleButton>
                    <ToggleButton
                        value="new_query"
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