import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import UserInformation from "./user-information";
import FollowerList from "./follower-list";
import { User } from "../SentimentScreen/user";
import LoadingBackdrop from "../StartScreen/loading-backdrop";

export default function FollowersDialog(props: {
    openDialog: boolean,
    setOpenDialog: Function,
    userName: string,
    userInformation: User | undefined,
    userInformationLoading: boolean,
    userFollowers: User[],
    userFollowersLoading: boolean
}) {
    const [openDialog, setOpenDialog] = [props.openDialog, props.setOpenDialog];
    const [tabNumber, setTabNumber] = React.useState<number>(0);

    const userName = props.userName;

    const [userInformation, userInformationLoading] = [props.userInformation, props.userInformationLoading];
    const [userFollowers, userFollowersLoading] = [props.userFollowers, props.userFollowersLoading];

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleTabChange = (event: React.SyntheticEvent, newTabNumber: number) => {
        setTabNumber(newTabNumber);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleCloseDialog} scroll="paper">
                <DialogTitle>{userName}s Twitter Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can see the profile information and followers of {userName}.
                    </DialogContentText>
                    {userInformationLoading && <Box sx={{height: 200}}>
                        <LoadingBackdrop showDialog={userInformationLoading}/>
                    </Box>}
                    {!userInformationLoading &&
                        <Box>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={tabNumber} onChange={handleTabChange} aria-label="community-tabs"
                                      variant="fullWidth">
                                    <Tab label="User Information" {...allyProps(0)}/>
                                    <Tab label="Followers" {...allyProps(1)} disabled={userFollowersLoading}/>
                                </Tabs>
                            </Box>
                            <TabPanel value={tabNumber} index={0}>
                                {userInformation !== undefined && <UserInformation user={userInformation}/>}
                            </TabPanel>
                            <TabPanel value={tabNumber} index={1}>
                                <FollowerList followers={userFollowers}/>
                            </TabPanel>
                        </Box>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function allyProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}