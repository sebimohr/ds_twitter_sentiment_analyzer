import { User } from "../SentimentScreen/user";
import { Avatar, Chip, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import VerifiedIcon from '@mui/icons-material/Verified';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function UserInformation(props: {
    user: User
}) {
    const user = props.user;

    const tweetList = user.tweets.map(value =>
        <ListItem key={value.id}>
            <ListItemIcon><TwitterIcon/></ListItemIcon>
            <ListItemText
                primary={value.content}
            />
        </ListItem>
    );

    return (
        <Stack sx={{width: '100%'}} spacing={4}>
            <Stack direction="row" spacing={2}>
                {user.profile_image_url !== undefined &&
                    <Avatar alt="profile-pic" src={user.profile_image_url} sx={{height: 96, width: 96}}/>}
                <Stack spacing={1}>
                    <Typography component="span" variant="h4">{user.name}</Typography>
                    <Typography component="span" variant="h5">@{user.username}</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Chip label={"Followers: " + user.metrics.followers_count}/>
                <Chip label={"Following: " + user.metrics.following_count}/>
                <Chip label={"Tweets: " + user.metrics.tweet_count}/>
                {user.metrics.verified && <Chip icon={<VerifiedIcon/>} label="verified"/>}
            </Stack>
            <Typography component="span" variant="body1">{user.description}</Typography>
            <List aria-label="tweets-list">
                {tweetList}
            </List>
        </Stack>
    )
}