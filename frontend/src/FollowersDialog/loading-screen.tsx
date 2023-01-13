import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function LoadingScreen() {
    return (
        <Stack direction="row"
               alignItems="center"
               justifyContent="center"
               sx={{width: '100%', height: 300}}>
            <CircularProgress/>
        </Stack>
    );
}