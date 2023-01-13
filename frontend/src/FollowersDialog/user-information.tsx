import { User } from "../SentimentScreen/user";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import VerifiedIcon from '@mui/icons-material/Verified';

export default function UserInformation(props: {
    user: User
}) {
    const user = props.user;

    return (
        <Stack sx={{width: '100%'}} spacing={4}>
            <Stack direction="row">
                {user.profile_image_url.length > 0 && <Avatar alt="profile-pic" src={user.profile_image_url}/>}
                <Stack spacing={2}>
                    <Typography variant="h4">{user.name}</Typography>
                    <Typography variant="h5">@{user.username}</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Chip label={"Followers: " + user.metrics.followers_count}/>
                <Chip label={"Following: " + user.metrics.following_count}/>
                <Chip label={"Tweets: " + user.metrics.tweet_count}/>
                {user.metrics.verified && <Chip icon={<VerifiedIcon/>} label="verified"/>}
            </Stack>
            <Typography variant="body1">user.description</Typography>
        </Stack>
    )
}