import { Reducer } from "redux";
import { saveUserType, errorType } from "../actionTypes/userTypes";
export interface UserState {
    email: string;
    name: string;
    address: string;
    picture: string;
    error: string;
}

const initialState: UserState = {
    email: '',
    name: '',
    address: '',
    picture: '',
    error: '',
};

export const reducer: Reducer<UserState> = (state = initialState, action: any) => {
    switch (action.type) {
        case saveUserType:
            return {
                email: action.data.email,
                name: action.data.name,
                address: action.data.address,
                picture: action.data.picture,
                error: ''
            };
        case errorType:
            return {
                ...state,
                error: action.data
            };
        default:
            return state
    }
};
