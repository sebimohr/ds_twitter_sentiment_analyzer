import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import { SentimentScreenListItem } from "./sentiment-screen-list-item";
import FollowersDialog from "../FollowersDialog/followers-dialog";

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
    showSkeleton: boolean
}) {
    const isHashtagList = props.isHashtagList;
    const secondaryText = isHashtagList ? "with this hashtag" : "from this user";

    const [followersDialogIsShown, setFollowersDialogIsShown] = React.useState<boolean>(false);

    const openFollowersDialog = () => {
        setFollowersDialogIsShown(true);
    }

    const listItems = props.listToShow.map(value =>
        <ListItem key={value.id !== null ? value.id : value.name}>
            <ListItemButton
                sx={{
                    bgcolor: determineListItemColor(value.sentiment),
                    borderRadius: 2
                }}
                onClick = {openFollowersDialog}>
                <ListItemIcon>{isHashtagList ? <TagIcon/> : <PersonIcon/>}</ListItemIcon>
                <ListItemText
                    primary={value.name}
                    secondary={value.count + ((Number(value.count) > 1) ? ' Tweets ' : ' Tweet ') + secondaryText}/>
            </ListItemButton>
        </ListItem>
    );

    const mockListItem =
        <ListItem>
            <ListItemButton sx={{
                borderRadius: 2
            }}
            >
                <ListItemIcon><TagIcon/></ListItemIcon>
                <ListItemText
                    primary="empty"
                    secondary="empty2"/>
            </ListItemButton>
        </ListItem>;

    const listSkeleton = <Skeleton variant="rounded" width={'100%'}>
        {mockListItem}
        {mockListItem}
        {mockListItem}
        {mockListItem}
        {mockListItem}
    </Skeleton>;

    return (
        <Stack sx={{width: '100%'}}>
            <Typography variant="h5" align="center">
                {isHashtagList ? "Top Hashtags" : "Top Users"}
            </Typography>
            <List
                aria-label={isHashtagList ? "Top Hashtags" : "Top Users"}>
                {props.showSkeleton ?
                    listSkeleton :
                    listItems}
            </List>
            <FollowersDialog openDialog={followersDialogIsShown} setOpenDialog={setFollowersDialogIsShown}/>
        </Stack>
    )
}