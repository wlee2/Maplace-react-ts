import UserService from "../services/userService";
import { saveUserType, errorType, logoutType } from "../store/userStore";
import { encrypting } from "../common";
import { openSnackbar } from "../store/snackbarStore"

export interface UserActionState {
    login: (email: string, password: string, cb: (error: string | null, success: boolean) => void) => any;
    googleLogin: any;
    getUserInfo: () => void;
    logout: () => void;
    tryRegister: (email: string, address: string, name: string, password: string, cb: (error: string | null, success: boolean) => void) => any;
    openSnackbarInUserAction: any;
}


const userService: UserService = new UserService();
export const UserAction: UserActionState = {
    login: (email: string, password: string, cb: (error: string | null, success: boolean) => void) => async (dispatch: any) => {

        try {
            const token = await userService.tryLogin(email, password);
            const encrypted = await encrypting(token.token);
            localStorage.setItem("token", encrypted);

            const user = await userService.getUsers();
            dispatch({
                type: saveUserType,
                data: user
            })
            dispatch({
                type: openSnackbar,
                status: 'Success',
                message: `Welcome ${user.Name}`
            })
            cb(null, true)
        } catch (err) {
            console.log(err);
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
                type: openSnackbar,
                status: 'Success',
                message: `Welcome ${user.Name}`
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
        dispatch({
            type: openSnackbar,
            status: 'Success',
            message: `Successfully logged out!`
        })

    },
    openSnackbarInUserAction: (status: 'Success' | 'Error', message: string) => (dispatch: any) => {
        dispatch({
            type: openSnackbar,
            status: status,
            message: message
        })
    }
}
