import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import styles from './Login.module.scss';
import { Redirect } from 'react-router-dom';

interface LocalLoginProps {
    local: boolean;
    onClose: (local: boolean) => void;
    login: (email: string, password: string, cb: CallableFunction) => void;
    getUser: () => void;
    userRegister: (email: string, address: string, name: string, password: string, cb: CallableFunction) => any;
    error: string;
}

class LocalLogin extends Component<LocalLoginProps, any> {
    state = {
        email: '',
        password: '',
        retypedPassword: '',
        register: false,
        registerError: '',
        name: '',
        address: '',
        successToLogin: false
    }

    inputHandler = (event: any, type: string) => {
        if (type === 'email') {
            this.setState({ email: event.target.value })
        }
        else if (type === 'password') {
            this.setState({ password: event.target.value })
        }
        else if (type === 'retypedPassword') {
            this.setState({ retypedPassword: event.target.value })
        }
        else if (type === 'address') {
            this.setState({ address: event.target.value })
        }
        else if (type === 'name') {
            this.setState({ name: event.target.value })
        }
    }

    loginRequest = () => {
        this.props.login(this.state.email.toLowerCase(), this.state.password, (err: string, sucess: any) => {
            if (err) {
                return;
            }
            this.props.getUser();
            this.setState({ successToLogin: true })
            this.props.onClose(false);
        });
    }

    registerRequest = () => {
        this.setState({ registerError: "" })
        const { email, address, name, password, retypedPassword } = this.state;
        if (address === '' || name === '') {
            this.setState({ registerError: "All fields are required" })
            return;
        }
        if (!email.match(/[A-z0-9]+@[A-z0-9.-]+\.[A-z]{2,4}$/g)) {
            this.setState({ registerError: "Email format is not allowed" }, () => console.log(this.state))
            return;
        }
        if (password.length < 5) {
            this.setState({ registerError: "Password must be over 5 char" })
            return;
        }
        if (password === '' || password !== retypedPassword) {
            this.setState({ registerError: "Password is not matched" })
            return;
        }
        this.props.userRegister(this.state.email, this.state.address, this.state.name, this.state.password, (err: any, status: boolean) => {
            if (err) {
                this.setState({ registerError: err })
                return;
            }
            console.log(status);
            window.alert('success to regist');
            this.toggleRegister();
        });

    }

    toggleRegister = () => {
        this.setState({
            register: !this.state.register,
            registerError: '',
            email: '',
            password: '',
            retypedPassword: '',
            name: '',
            address: '',
            successToLogin: false
        })
    }

    render() {
        return (
            <>
                <Dialog open={this.props.local}>
                    {
                        this.state.register ?
                            <RegisterPresenter {...this} />
                            :
                            <LoginPresenter {...this} />
                        // LoginPresenter(email, password, error, this.inputHandler, this.toggleRegister, this.loginRequest, onClose)
                    }
                </Dialog>
            </>
        );
    }
}

// interface LoginPresenterProps {
//     email: string, password: string, error: string, inputHandler: any, toggleRegister: any, loginRequest: any, onClose: any
// }

const LoginPresenter: React.FC<any> = (props: any) => {
    return (
        <>
            <DialogTitle>Local Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Address"
                    type="email"
                    value={props.state.email}
                    onChange={(event) => props.inputHandler(event, 'email')}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    value={props.state.password}
                    onChange={(event) => props.inputHandler(event, 'password')}
                    fullWidth
                />
            </DialogContent>
            <DialogContentText id={styles.errorContent}>
                {props.props.error && props.props.error}
            </DialogContentText>
            <DialogActions>
                <Button color="primary" onClick={props.toggleRegister}>
                    Register
                </Button>
                <Button color="primary" onClick={props.loginRequest}>
                    Login
                </Button>
                <Button color="secondary" onClick={() => props.props.onClose(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </>
    )
}

const RegisterPresenter: React.FC<any> = (props: any) => {
    return (
        <>
            <DialogTitle>Local Register</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    type="name"
                    value={props.state.name}
                    onChange={(event) => props.inputHandler(event, 'name')}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Address"
                    type="address"
                    value={props.state.address}
                    onChange={(event) => props.inputHandler(event, 'address')}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Address"
                    type="email"
                    value={props.state.email}
                    onChange={(event) => props.inputHandler(event, 'email')}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    value={props.state.password}
                    onChange={(event) => props.inputHandler(event, 'password')}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Password Confirmation"
                    type="password"
                    value={props.state.retpyedPassword}
                    onChange={(event) => props.inputHandler(event, 'retypedPassword')}
                    fullWidth
                />
            </DialogContent>
            <DialogContentText id={styles.errorContent}>
                {props.state.registerError}
            </DialogContentText>
            <DialogActions>
                <Button color="primary" onClick={props.toggleRegister}>
                    Back
                </Button>
                <Button color="primary" onClick={props.registerRequest}>
                    Register
                </Button>
                <Button color="secondary" onClick={() => props.props.onClose(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </>
    );
};

export default LocalLogin;