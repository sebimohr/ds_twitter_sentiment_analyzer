import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function MessageSnackbar(props: {
    openErrorSnackbar: boolean
    changeOpenErrorSnackbar: Function
    errorMessage: string
    isFatalError: boolean
}) {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.changeOpenErrorSnackbar(false);
    }

    return (
        <div>
            <Snackbar
                open={props.openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                sx={{width: '100%'}}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={props.isFatalError ? "error" : "info"}
                >{props.errorMessage}</Alert>
            </Snackbar>
        </div>
    )
}