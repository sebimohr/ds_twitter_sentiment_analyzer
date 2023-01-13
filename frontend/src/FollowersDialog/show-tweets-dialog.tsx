import { Dialog, DialogContent, DialogTitle, List } from "@mui/material";
import { Tweet } from "../SentimentScreen/tweet";
import TweetItem from "./tweet-item";
import React from "react";
import LoadingScreen from "./loading-screen";
import NoContent from "./no-content";

export default function ShowTweetsDialog(props: {
    dialogIsShown: boolean
    setDialogIsShown: Function
    tweetsLoading: boolean
    tweets: Tweet[]
    dialogTitle: string
}) {
    const [dialogIsShown, setDialogIsShown] = [props.dialogIsShown, props.setDialogIsShown];
    const dialogTitle = props.dialogTitle;

    const handleCloseDialog = () => {
        setDialogIsShown(false);
    }

    const tweets = props.tweets.map(tweet =>
        <TweetItem tweet={tweet}/>
    );

    return (
        <Dialog open={dialogIsShown} onClose={handleCloseDialog} scroll="paper">
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                {props.tweetsLoading ?
                    <LoadingScreen/> :
                    <List>
                        {props.tweets.length > 0 ?
                            tweets :
                            <NoContent message={"User doesn't have any tweets to show."}/>
                        }
                    </List>}
            </DialogContent>
        </Dialog>
    )
}