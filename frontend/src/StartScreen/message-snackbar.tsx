import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";
import { SnackbarSeverity } from "../Infrastructure/snackbar-severity";

export default function MessageSnackbar(props: {
    openErrorSnackbar: boolean
    changeOpenErrorSnackbar: Function
    errorMessage: string
    errorCode: SnackbarSeverity
}) {
    let errorSeverity: AlertColor;
    switch (props.errorCode) {
        case SnackbarSeverity.Error:
            errorSeverity = "error";
            break;
        case SnackbarSeverity.Warning:
            errorSeverity = "warning";
            break;
        case SnackbarSeverity.Info:
            errorSeverity = "info";
            break;
        case SnackbarSeverity.Success:
            errorSeverity = "success";
            break;
        default:
            errorSeverity = "error";
    }

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
                autoHideDuration={3000}
                onClose={handleClose}
                sx={{width: '100%'}}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={errorSeverity}
                >{props.errorMessage}</Alert>
            </Snackbar>
        </div>
    )
}