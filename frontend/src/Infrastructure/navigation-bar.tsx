import React from "react";
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function NavigationBar() {


    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Twitter Sentiment Analyzer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}