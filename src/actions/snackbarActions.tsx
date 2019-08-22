import { openSnackbar, closeSnackbar } from "../store/snackbarStore";

export const SnackbarAction = {
    openSnackbar: (status: 'Success' | 'Error', message: string) => (dispatch: any) => {
        dispatch({
            type: openSnackbar,
            status: status,
            message: message
        })
    },
    closeSnackbar: () => (dispatch: any) => {
        dispatch({
            type: closeSnackbar
        })
    }
}
