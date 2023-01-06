import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";

export default function SentimentScreenList(props: {
    isHashtagList: boolean
    listToShow: []
}) {
    const isHashtagList = props.isHashtagList;

    return (
        <List
            sx={{width: '100%', bgcolor: 'background.paper'}}
            aria-label={isHashtagList ? "Top Hashtags" : "Top Users"}>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>{isHashtagList ? <TagIcon/> : <PersonIcon/>}</ListItemIcon>
                    <ListItemText
                        primary={"Oben Text"}
                        secondary={"Unten Text"}/>
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton>
                    <ListItemIcon>{isHashtagList ? <TagIcon/> : <PersonIcon/>}</ListItemIcon>
                    <ListItemText
                        primary={"Oben Text"}
                        secondary={"Unten Text"}/>
                </ListItemButton>
            </ListItem>
        </List>
    )
}