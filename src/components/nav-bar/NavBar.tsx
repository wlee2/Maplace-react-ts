import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { HomeSharp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import Login from '../login/Login';

const NavBar = () => {
    return (
        <div>
            <AppBar className={styles.navBar} position="fixed">
                <Toolbar>
                    <Link to="/">
                        <IconButton className={styles.whiteMode}>
                            <HomeSharp />
                        </IconButton>
                    </Link>
                    <Link to="/" className={styles.whiteMode}>
                        <Typography variant="subtitle1">
                            MaPlace
                        </Typography>
                    </Link>
                    <span className={styles.spacer}></span>
                    <Login />

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;