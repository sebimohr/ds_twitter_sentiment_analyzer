import { User } from "../SentimentScreen/user";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { AxiosClient } from "../Client/axios-client";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";
import { Tweet } from "../SentimentScreen/tweet";
import React from "react";

const client = new AxiosClient();

export default function FollowerList(props: {
    followers: User[]
    showSnackbar: Function
    setFollower: Function
    setFollowerTweetsLoading: Function
    setFollowerTweetsDialogIsOpen: Function
    setFollowerTweets: Function
}) {
    const setFollower = props.setFollower;
    const setFollowerTweetsLoading = props.setFollowerTweetsLoading;
    const setFollowerTweetsDialogIsOpen = props.setFollowerTweetsDialogIsOpen;
    const setFollowerTweets = props.setFollowerTweets;

    const openFollowerTweetsDialog = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>,
                                            user: User) => {
        setFollowerTweetsDialogIsOpen(true);
        setFollowerTweetsLoading(true);
        setFollower(user);

        await client.GetUserTweets(user.id,
            (clientErrorMessage: string,
             severity: SnackbarSeverity,
             logMessage: string) => {
                props.showSnackbar(clientErrorMessage, severity, logMessage);
                setFollowerTweetsDialogIsOpen(false);
                setFollowerTweetsLoading(false);
            },
            (tweets: Tweet[]) => {
                setFollowerTweetsLoading(false);
                setFollowerTweets(tweets);
                props.showSnackbar(`${tweets.length} tweets have been retrieved`, SnackbarSeverity.Success, "");
            });
    }

    const listItems = props.followers.map(value =>
        <ListItem key={value.id}>
            <ListItemButton
                sx={{
                    borderRadius: 2
                }}
                onClick={(event) => openFollowerTweetsDialog(event, value)}>
                <ListItemIcon><PersonIcon/></ListItemIcon>
                <ListItemText
                    primary={value.name}
                    secondary={"@" + value.username}
                />
            </ListItemButton>
        </ListItem>
    );

    return (
        <Stack sx={{width: '100%'}}>
            <List aria-label="followers-list">
                {listItems}
            </List>
        </Stack>
    )
}