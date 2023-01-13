import React from "react";
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const backButtonWidth = 48;

export default function NavigationBar(props: {
    showBackButton: boolean,
    backButtonFunction: Function
}) {
    const handleBackButtonPressed = () => {
        props.backButtonFunction();
    }

    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <AppBar position="static">
                <Toolbar>
                    {props.showBackButton ? <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{width: backButtonWidth, mr: 2}}
                            onClick={handleBackButtonPressed}
                        >
                            <ArrowBackIcon/>
                        </IconButton> :
                        <Box sx={{width: backButtonWidth - 12, mr: 2}}/>}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Twitter Sentiment Analyzer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}