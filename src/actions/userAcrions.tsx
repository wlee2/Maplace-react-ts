import UserService from "../services/userService";
import { saveUserType, errorType } from "../actionTypes/userTypes";
import { encrypting } from "../common";
import { loginType, logoutType, closeAllType } from "../actionTypes/snackbarTypes";
import { SyntheticEvent } from "react";

export interface UserActionState {
    login: (email: string, password: string, cb: CallableFunction) => any;
    getUserInfo: () => void;
    logout: () => void;
    closeSnackbar: (event?: SyntheticEvent, reason?: string) => void;
    tryRegister: (email: string, address: string, name: string, password: string, cb: CallableFunction) => any;
}


const userService: UserService = new UserService();
export const UserAction: UserActionState = {
    login: (email: string, password: string, cb: CallableFunction) => (dispatch: any) => {
        userService.tryLogin(email, password).subscribe(
            token => {
                localStorage.setItem("token", encrypting(token.token))
                userService.getUsers().subscribe(
                    res => {
                        console.log(res)
                        dispatch({
                            type: saveUserType,
                            data: res
                        })
                        dispatch({
                            type: loginType
                        })
                        cb(null, true)
                    },
                    err => {
                        console.error(err);
                        dispatch({
                            type: errorType,
                            data: err
                        })
                        cb(err, false)
                    })
            },
            err => {
                console.error(err);
                dispatch({
                    type: errorType,
                    data: err
                })
                cb(err, false)
            }
        )
    },
    tryRegister: (email: string, address: string, name: string, password: string, cb: CallableFunction) => async (dispatch: any): Promise<any> => {
        let registerResult = await userService.Register(email, address, name, password);
        if(registerResult === true) {
            cb(null, true)
        }
        else {
            cb(registerResult, false)
        }
    },
    getUserInfo: () => (dispatch: any) => {
        //token required
        userService.getUsers().subscribe(
            res => {
                console.log(res)
                dispatch({
                    type: saveUserType,
                    data: res
                })
                dispatch({
                    type: loginType
                })
            },
            err => {
                localStorage.removeItem('token');
                console.error(err);
            })
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
