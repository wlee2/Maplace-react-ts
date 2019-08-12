import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';

interface LoginLoginProps {
    local: boolean;
    onClose: (local: boolean) => void;
    login: (email: string, password: string) => void;
    error: string;
}

class LocalLogin extends Component<LoginLoginProps, any> {
    state = {
        open: false,
        email: '',
        password: ''
    }

    inputHandler = (event: any, type: string) => {
        if (type === 'email') {
            this.setState({
                email: event.target.value
            })
        }
        else if (type === 'password') {
            this.setState({
                password: event.target.value
            })
        }
    }

    loginRequest = () => {
        this.props.login(this.state.email, this.state.password)
    }

    render() {
        return (
            <Dialog open={this.props.local}>
                <DialogTitle>Local</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.inputHandler(event, 'email')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.inputHandler(event, 'password')}
                        fullWidth
                    />
                </DialogContent>
                <DialogContentText>
                    {this.props.error}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={this.loginRequest}>
                        Login
                    </Button>
                    <Button onClick={() => this.props.onClose(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default LocalLogin;