import { Reducer } from "redux";

export const saveUserType = "SAVE_USER";
export const errorType = "ERROR"
export const logoutType = "LOGOUT"

export interface UserState {
    email: string;
    name: string;
    picture: string;
    error: string;
}

const initialState: UserState = {
    email: '',
    name: '',
    picture: '',
    error: '',
};

export const reducer: Reducer<UserState> = (state = initialState, action: any) => {
    switch (action.type) {
        case saveUserType:
            return {
                email: action.data.Email,
                name: action.data.Name,
                picture: action.data.Picture,
                error: ''
            };
        case errorType:
            return {
                ...state,
                error: action.data
            };
        case logoutType:
            return {
                ...initialState
            }
        default:
            return state
    }
};
