import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { UserAction } from '../../actions/userAcrions';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import LoginDialog from './LoginDialog';
import LocalLogin from './LocalLogin';
import MySnackBar from '../snack-bar/MySnackBar';
import { LoginProps, LoginState } from './LoginInterface';
import { Link } from 'react-router-dom';

import { IconButton, Avatar, MenuItem, Menu, Divider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import styles from './Login.module.scss';

class Login extends Component<any | LoginProps, LoginState> {
    anchorRef: React.MutableRefObject<any>;

    constructor(props: any) {
        super(props);
        this.anchorRef = React.createRef<any>();
    }

    state = {
        open: false,
        local: false,
        userMenu: false
    }


    componentDidMount = () => {
        if (localStorage.getItem('token')) {
            this.props.getUserInfo();
        }
    }

    componentDidUpdate = () => {
        if (this.props.user.email !== '') {
            if (this.state.open || this.state.local) {
                this.setState({
                    open: false,
                    local: false
                })
                console.log('im here')
            }
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true, local: false, userMenu: false });
    }

    handleClose = (local: boolean) => {
        this.setState({ open: false, local: local, userMenu: false });
    };

    userMenuOpen = () => {
        this.setState({ open: false, local: false, userMenu: true });
    }

    userMenuClose = () => {
        this.setState({ open: false, local: false, userMenu: false });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.user.email === '' ?
                        <>
                            <IconButton style={{ color: "white" }} onClick={this.handleClickOpen}>
                                <AccountCircle />
                            </IconButton>
                        </> :
                        <>
                            <IconButton onClick={this.userMenuOpen}>
                                <Avatar ref={this.anchorRef} src={this.props.user.picture} />
                            </IconButton>
                            <Menu
                                open={this.state.userMenu}
                                anchorEl={this.anchorRef.current}
                                keepMounted
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                onClose={this.userMenuClose}
                            >
                                <Link id={styles.menuList} to="/user" onClick={this.userMenuClose}><MenuItem>{this.props.user.name.split(' ')[0]}</MenuItem></Link>
                                <Divider variant="fullWidth" component="ul" />
                                <MenuItem id={styles.menuList} onClick={() => { this.props.logout(); this.userMenuClose(); }}>Logout</MenuItem>
                            </Menu>
                        </>
                }
                <LoginDialog open={this.state.open} onClose={this.handleClose}></LoginDialog>
                <LocalLogin local={this.state.local} onClose={this.handleClose} login={this.props.login} userRegister={this.props.tryRegister} error={this.props.user.error}></LocalLogin>
                <MySnackBar open={this.props.snackbar.login} type={'Success'} handleClose={this.props.closeSnackbar} message={`Welcome ${this.props.user.name.split(' ')[0]}`} />
                <MySnackBar open={this.props.snackbar.logout} type={'Success'} handleClose={this.props.closeSnackbar} message={`Logout!`} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user,
    snackbar: state.snackbar
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(UserAction as any, dispatch)
)(Login);