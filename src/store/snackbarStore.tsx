import { Reducer } from "redux";
import { loginType, logoutType, closeAllType } from "../actionTypes/snackbarTypes";

export interface SnackbarState {
    login: boolean;
    logout: boolean;
}

const initialState: SnackbarState = {
    login: false,
    logout: false,
};

export const reducer: Reducer<SnackbarState> = (state = initialState, action: any) => {
    switch (action.type) {
        case loginType:
            return {
                ...initialState,
                login: true
            };
        case logoutType:
            return {
                ...initialState,
                logout: true
            };
        case closeAllType:
            return {
                ...initialState
            }
        default:
            return state
    }
};
