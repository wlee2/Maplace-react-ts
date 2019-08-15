import { UserState } from "../../store/userStore";
import { SnackbarState } from "../../store/snackbarStore";

export interface LoginProps {
    user: UserState;
    snackbar: SnackbarState;
    login: (email: string, password: string) => void;
    getUserInfo: () => void;
    closeSnackbar: () => void;
}

export interface LoginState {
    open: boolean;
    local: boolean;
    userMenu: boolean;
}