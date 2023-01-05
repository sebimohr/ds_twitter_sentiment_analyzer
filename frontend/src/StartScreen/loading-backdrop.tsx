import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingBackdrop(props: { showDialog: boolean }) {
    const open = props.showDialog;

    return (
        <div>
            <Backdrop open={open}
                      sx={{
                          color: '#fff',
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}>
                <CircularProgress/>
            </Backdrop>
        </div>
    )
}