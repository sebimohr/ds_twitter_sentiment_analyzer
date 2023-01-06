import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import { SentimentScreenListItem } from "./sentiment-screen-list-item";

const determineListItemColor = (sentiment: number): string => {
    if (sentiment > 0.5) {
        return "#69f0ae";
    } else if (sentiment > 0) {
        return "#b9f6ca"
    } else if (sentiment < -0.5) {
        return "#ff5252";
    } else if (sentiment < 0) {
        return "#ff8a80"
    } else {
        return "#eeeeee";
    }
}

export default function SentimentScreenList(props: {
    isHashtagList: boolean
    listToShow: SentimentScreenListItem[]
}) {
    const isHashtagList = props.isHashtagList;

    const listItems = props.listToShow.map(value =>
        <ListItem>
            <ListItemButton sx={{
                bgcolor: determineListItemColor(value.sentiment),
                borderRadius: 2
            }}>
                <ListItemIcon>{isHashtagList ? <TagIcon/> : <PersonIcon/>}</ListItemIcon>
                <ListItemText
                    primary={value.main_text}
                    secondary={value.sub_text}/>
            </ListItemButton>
        </ListItem>
    );

    return (
        <List
            sx={{width: '50%'}}
            aria-label={isHashtagList ? "Top Hashtags" : "Top Users"}>
            {listItems}
        </List>
    )
}