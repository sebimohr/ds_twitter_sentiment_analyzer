import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import { SentimentScreenListItem } from "./sentiment-screen-list-item";
import UserInformationDialog from "../FollowersDialog/user-information-dialog";
import { User } from "./user";
import { AxiosClient } from "../Client/axios-client";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";
import ShowTweetsDialog from "../FollowersDialog/show-tweets-dialog";
import { Tweet } from "./tweet";

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

const mockListItem = <ListItem>
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
</Skeleton>;

const client = new AxiosClient();

export default function SentimentScreenList(props: {
    isHashtagList: boolean
    listToShow: SentimentScreenListItem[]
    showSkeleton: boolean
    showSnackbar: Function
    hashtag: string
}) {
    const isHashtagList = props.isHashtagList;
    const secondaryText = isHashtagList ? "with this hashtag" : "from this user";

    const [followersDialogIsShown, setFollowersDialogIsShown] = React.useState<boolean>(false);
    const [userNameForFollowersDialog, setUserNameForFollowersDialog] = React.useState<string>("");

    const [userInformation, setUserInformation] = React.useState<User>({} as User);
    const [userInformationLoading, setUserInformationLoading] = React.useState<boolean>(false);
    const [userFollowers, setUserFollowers] = React.useState<User[]>([]);
    const [userFollowersLoading, setUserFollowersLoading] = React.useState<boolean>(false);

    const [showHashtagDialog, setShowHashtagDialog] = React.useState<boolean>(false);
    const [hashtagDialogTweetsLoading, setHashtagDialogTweetsLoading] = React.useState<boolean>(false);
    const [hashtagTweets, setHashtagTweets] = React.useState<Tweet[]>([]);
    const [clickedHashtag, setClickedHashtag] = React.useState<string>("");

    const changeFollowersDialogIsShown = (isShown: boolean) => {
        setFollowersDialogIsShown(isShown);

        // when closing the dialog, all the data that gets displayed in the dialog is removed
        if (!isShown) {
            setUserNameForFollowersDialog("");
            setUserFollowers([]);
        }
    }

    const openDialog = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>,
                              value: SentimentScreenListItem) => {
        if (isHashtagList) {
            setShowHashtagDialog(true);
            setHashtagDialogTweetsLoading(true);
            setClickedHashtag(value.name);

            await client.GetHashtagTweets(props.hashtag,
                value.name,
                (clientErrorMessage: string,
                 severity: SnackbarSeverity,
                 logMessage: string) => {
                    props.showSnackbar(clientErrorMessage, severity, logMessage);
                    changeFollowersDialogIsShown(false);
                },
                (tweets: Tweet[]) => {
                    setHashtagTweets(tweets);
                    setHashtagDialogTweetsLoading(false);
                    if (!(tweets.length > 0)) {
                        props.showSnackbar(
                            "Something went wrong, please try again or inform your system administrator.",
                            SnackbarSeverity.Warning,
                            "Tweet with top hashtag couldn't be retrieved");
                    }
                });
        } else {
            setUserInformationLoading(true);
            changeFollowersDialogIsShown(true);
            setUserNameForFollowersDialog(value.name);

            await client.GetUserInformation(value.id, props.hashtag,
                (clientErrorMessage: string,
                 severity: SnackbarSeverity,
                 logMessage: string) => {
                    props.showSnackbar(clientErrorMessage, severity, logMessage);
                    changeFollowersDialogIsShown(false);
                },
                async (user: User) => {
                    setUserInformation(user);
                    setUserInformationLoading(false);
                    setUserFollowersLoading(true);
                    if (user.metrics.followers_count > 0)
                        await requestUserFollowers(value.id);
                    else {
                        props.showSnackbar("User has no followers", SnackbarSeverity.Info, "");
                        setUserFollowersLoading(false);
                    }
                });
        }
    }

    const requestUserFollowers = async (user_id: string) => {
        await client.GetUserFollowers(user_id,
            (clientErrorMessage: string, severity: SnackbarSeverity, logMessage: string) => {
                props.showSnackbar(clientErrorMessage, severity, logMessage);
            },
            (followers: User[]) => {
                setUserFollowers(followers);
                setUserFollowersLoading(false);
            });
    }

    const listItems = props.listToShow.map(value =>
        <ListItem key={value.id !== null ? value.id : value.name}>
            <ListItemButton
                sx={{
                    bgcolor: determineListItemColor(value.sentiment),
                    borderRadius: 2
                }}
                onClick={(event) => openDialog(event, value)}>
                <ListItemIcon>{isHashtagList ? <TagIcon/> : <PersonIcon/>}</ListItemIcon>
                <ListItemText
                    primary={value.name}
                    secondary={value.count + ((Number(value.count) > 1) ? ' Tweets ' : ' Tweet ') + secondaryText}/>
            </ListItemButton>
        </ListItem>
    );

    return (
        <Stack sx={{width: '100%'}}>
            <Typography variant="h5" align="center">
                {isHashtagList ? "Top Hashtags" : "Top Users"}
            </Typography>
            <List
                aria-label={isHashtagList ? "top-hashtags" : "top-users"}>
                {props.showSkeleton ?
                    listSkeleton :
                    listItems}
            </List>
            <UserInformationDialog openDialog={followersDialogIsShown}
                                   setOpenDialog={changeFollowersDialogIsShown}
                                   userName={userNameForFollowersDialog}
                                   userFollowers={userFollowers}
                                   userFollowersLoading={userFollowersLoading}
                                   userInformation={userInformation}
                                   userInformationLoading={userInformationLoading}
                                   showSnackbar={props.showSnackbar}/>
            <ShowTweetsDialog dialogIsShown={showHashtagDialog}
                              setDialogIsShown={setShowHashtagDialog}
                              tweetsLoading={hashtagDialogTweetsLoading}
                              tweets={hashtagTweets}
                              dialogTitle={`Tweets with #${clickedHashtag}`}/>
        </Stack>
    )
}