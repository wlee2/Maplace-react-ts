import UserService from "../services/userService";
import { saveUserType, errorType } from "../actionTypes/userTypes";

const userService: UserService = new UserService();
export const UserAction = {
    login: (email: string, password: string) => (dispatch: any) => {
        userService.tryLogin(email, password).subscribe(
            token => {
                console.log(token);
                localStorage.setItem("token", token.token)
                userService.getUsers().subscribe(
                    res => {
                        console.log(res)
                        dispatch({
                            type: saveUserType,
                            data: res
                        })
                    },
                    err => {
                        console.error(err);
                        dispatch({
                            type: errorType,
                            data: err.data.message
                        })
                    })
            },
            err => {
                console.error(err);
                dispatch({
                    type: errorType,
                    data: err.data.message
                })
            }
        )
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
            },
            err => {
                localStorage.removeItem('token');
                console.error(err);
            })
    }
}
