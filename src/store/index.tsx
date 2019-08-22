import { combineReducers, createStore, Reducer, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import * as User from "./userStore";
import * as Snackbar from "./snackbarStore";
import * as Review from "./reviewStore";

export interface StoreState {
    user: User.UserState;
    snackbar: Snackbar.SnackbarState;
    reviews: Review.ReviewState;
}

export default function configureStore() {
    const reducers: Reducer<StoreState> = combineReducers<StoreState>({
        user: User.reducer,
        snackbar: Snackbar.reducer,
        reviews: Review.reducer
    });

    const w: any = window as any;
    const dev = w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__();
    if (checkBrowser() === 'Safari') {
        return createStore(reducers, compose(applyMiddleware(thunk)));
    }
    return createStore(reducers, compose(applyMiddleware(thunk), dev));

}


function checkBrowser() {
    const d: any = document as any;
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
        return 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        return 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") !== -1) {
        return 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        return 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!d.documentMode === true)) //IF IE > 10
    {
        return 'IE';
    }
    else {
        return null;
    }
}
