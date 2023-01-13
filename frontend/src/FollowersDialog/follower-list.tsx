import { User } from "../SentimentScreen/user";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function FollowerList(props: {
    followers: User[]
}) {
    const listItems = props.followers.map(value =>
        <ListItem key={value.id}>
            <ListItemButton sx={{
                borderRadius: 2
            }}>
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