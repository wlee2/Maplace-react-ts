import { combineReducers, createStore, Reducer, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import * as User from "./userStore";
import * as Snackbar from "./snackbarStore";

export interface StoreState {
    user: User.UserState;
    snackbar: Snackbar.SnackbarState
}

export default function configureStore() {
    const reducers: Reducer<StoreState> = combineReducers<StoreState>({
        user: User.reducer,
        snackbar: Snackbar.reducer
    });

    const w: any = window as any;
    const dev = w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__();
    return createStore(reducers, compose(applyMiddleware(thunk), dev));
}
