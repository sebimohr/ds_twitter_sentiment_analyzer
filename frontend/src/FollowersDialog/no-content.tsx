import { Stack, Typography } from "@mui/material";
import React from "react";

export default function NoContent(props: {
    message: string
}) {
    return (
        <Stack sx={{width: '100%', height: 200}}
               alignItems="center"
               justifyContent="center">
            <Typography variant="body1">{props.message}</Typography>
        </Stack>
    );
}