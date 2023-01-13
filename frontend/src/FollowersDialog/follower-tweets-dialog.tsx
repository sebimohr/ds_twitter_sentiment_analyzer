import { Dialog, DialogContent, DialogTitle, List } from "@mui/material";
import { Tweet } from "../SentimentScreen/tweet";
import TweetItem from "./tweet-item";
import { User } from "../SentimentScreen/user";
import React from "react";
import LoadingScreen from "./loading-screen";

export default function FollowerTweetsDialog(props: {
    dialogIsShown: boolean
    setDialogIsShown: Function
    tweetsLoading: boolean
    tweets: Tweet[]
    user: User
}) {
    const [dialogIsShown, setDialogIsShown] = [props.dialogIsShown, props.setDialogIsShown];
    const user = props.user;

    const handleCloseDialog = () => {
        setDialogIsShown(false);
    }

    const tweets = props.tweets.map(tweet =>
        <TweetItem tweet={tweet}/>
    );

    return (
        <Dialog open={dialogIsShown} onClose={handleCloseDialog} scroll="paper">
            <DialogTitle>{user.name}s recent tweets</DialogTitle>
            <DialogContent>
                {props.tweetsLoading ?
                    <LoadingScreen/> :
                    <List>
                        {tweets}
                    </List>}
            </DialogContent>
        </Dialog>
    )
}