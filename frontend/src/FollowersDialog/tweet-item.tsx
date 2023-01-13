import { Chip, Divider, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { Tweet } from "../SentimentScreen/tweet";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import CachedIcon from '@mui/icons-material/Cached';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function TweetItem(props: {
    tweet: Tweet
}) {
    const tweet = props.tweet;
    const tweet_created_at = new Date(tweet.metrics.created_at).toLocaleDateString('en-us', {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return (
        <Stack spacing={1} sx={{mt: 1}}>
            <Divider variant="inset" component="li"/>
            <ListItem key={tweet.id}>
                <ListItemIcon><TwitterIcon/></ListItemIcon>
                <Stack>
                    <Typography variant="overline">{tweet_created_at}</Typography>
                    <ListItemText
                        primary={tweet.content}
                    />
                    <Stack direction="row" spacing={2}>
                        <Chip icon={<FavoriteIcon/>} label={tweet.metrics.like_count}/>
                        <Chip icon={<ReplyIcon/>} label={tweet.metrics.reply_count}/>
                        <Chip icon={<CachedIcon/>} label={tweet.metrics.retweet_count}/>
                        <Chip icon={<FormatQuoteIcon/>} label={tweet.metrics.quote_count}/>
                    </Stack>
                </Stack>
            </ListItem>
        </Stack>
    )
}