import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

export default function FollowersDialog(props: {
    openDialog: boolean,
    setOpenDialog: Function
}) {
    const [openDialog, setOpenDialog] = [props.openDialog, props.setOpenDialog];
    const [tabNumber, setTabNumber] = React.useState<number>(0)

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleTabChange = (event: React.SyntheticEvent, newTabNumber: number) => {
        setTabNumber(newTabNumber);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>[[Username]]s Community</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can see the followers of [[Username]] and their recent tweets
                    </DialogContentText>
                    <Box>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={tabNumber} onChange={handleTabChange} aria-label="community-tabs"
                                  variant="fullWidth">
                                <Tab label="User Information" {...allyProps(0)}/>
                                <Tab label="Followers" {...allyProps(1)}/>
                                <Tab label="Timeline" {...allyProps(2)}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={tabNumber} index={0}>

                        </TabPanel>
                        <TabPanel value={tabNumber} index={1}>

                        </TabPanel>
                        <TabPanel value={tabNumber} index={2}>

                        </TabPanel>
                    </Box>
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
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}