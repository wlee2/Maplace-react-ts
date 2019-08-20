import UserService from "../services/userService";
import { saveUserType, errorType } from "../actionTypes/userTypes";
import { encrypting } from "../common";
import { loginType, logoutType, closeAllType } from "../actionTypes/snackbarTypes";
import { SyntheticEvent } from "react";

export interface UserActionState {
    login: (email: string, password: string, cb: (error: string | null, success: boolean) => void) => any;
    googleLogin: any;
    getUserInfo: () => void;
    logout: () => void;
    closeSnackbar: (event?: SyntheticEvent, reason?: string) => void;
    tryRegister: (email: string, address: string, name: string, password: string, cb: (error: string | null, success: boolean) => void) => any;
}


const userService: UserService = new UserService();
export const UserAction: UserActionState = {
    login: (email: string, password: string, cb: (error: string | null, success: boolean) => void) => async (dispatch: any) => {

        try {
            const token = await userService.tryLogin(email, password);
            localStorage.setItem("token", encrypting(token.token));

            const user = await userService.getUsers();
            dispatch({
                type: saveUserType,
                data: user
            })
            dispatch({
                type: loginType
            })
            cb(null, true)
        } catch (err) {
            dispatch({
                type: errorType,
                data: err
            })
            cb(err, false)
        }
    },
    googleLogin: () => (dispatch: any) => {
        var left = (window.screen.width / 2) - (400 / 2);
        var top = (window.screen.height / 2) - (600 / 2);
        window.open(`https://${window.location.hostname}:6500/user/google?redirectURL=${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth/`, '_blank', `toolbar=no,scrollbars=no,resizable=no,top=${top},left=${left},width=400,height=600`);
    },
    tryRegister: (email: string, address: string, name: string, password: string, cb: (error: string | null, success: boolean) => void) => async (dispatch: any): Promise<any> => {
        let registerResult = await userService.Register(email, address, name, password);
        if (registerResult === true) {
            cb(null, true)
        }
        else {
            cb(registerResult, false)
        }
    },
    getUserInfo: () => async (dispatch: any) => {
        //token required
        try {
            const user = await userService.getUsers();
            dispatch({
                type: saveUserType,
                data: user
            })
            dispatch({
                type: loginType
            })
        } catch (err) {
            localStorage.removeItem('token');
            console.error(err.error);
        }
    },
    logout: () => (dispatch: any) => {
        localStorage.removeItem('token');
        dispatch({
            type: logoutType
        })
    },
    closeSnackbar: (event?: SyntheticEvent, reason?: string) => (dispatch: any) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type: closeAllType
        })

    }
}
