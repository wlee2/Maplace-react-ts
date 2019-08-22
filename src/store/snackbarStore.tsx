import { Reducer } from "redux";

export const openSnackbar = "OPEN";
export const closeSnackbar = "CLOSE";

export interface SnackbarState {
    open: boolean;
    status: 'Success' | 'Error';
    message: string;
}

const initialState: SnackbarState = {
    open: false,
    status: 'Success',
    message: ''
};

export const reducer: Reducer<SnackbarState> = (state = initialState, action: any) => {
    switch (action.type) {
        case openSnackbar:
            return {
                open: true,
                status: action.status,
                message: action.message
            };
        case closeSnackbar:
            return {
                ...state,
                open: false
            };
        default:
            return state
    }
};
