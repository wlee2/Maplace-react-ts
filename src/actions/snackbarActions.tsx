import { loginType, closeAllType, logoutType } from "../actionTypes/snackbarTypes";

export const SnackbarAction = {
    login: () => (dispatch: any) => {
        dispatch({
            type: loginType
        })
    },
    logout: () => (dispatch: any) => {
        dispatch({
            type: logoutType
        })
    },
    closeSnackbar: () => (dispatch: any) => {
        dispatch({
            type: closeAllType
        })
    }
}
