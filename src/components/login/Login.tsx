import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { UserAction } from '../../actions/userAcrions';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import { IconButton, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import LoginDialog from './LoginDialog';
import LocalLogin from './LocalLogin';

class Login extends Component<any> {
    state = {
        open: false,
        local: false,
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = (local: boolean) => {
        this.setState({ open: false, local: local });
    };

    render() {
        return (
            <>
                {
                    this.props.user.email === '' ?
                        <>
                            <IconButton style={{ color: "white" }} onClick={this.handleClickOpen}>
                                <AccountCircle />
                            </IconButton>
                            <LoginDialog open={this.state.open} onClose={this.handleClose}></LoginDialog>
                            <LocalLogin local={this.state.local} onClose={this.handleClose} login={this.props.login} error={this.props.user.error}></LocalLogin>
                        </> :
                        <>
                            <Avatar src={this.props.user.picture} />
                        </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(UserAction, dispatch)
)(Login);