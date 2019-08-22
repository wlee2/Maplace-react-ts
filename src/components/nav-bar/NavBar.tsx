import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { HomeSharp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import Login from '../login/Login';

const NavBar = () => {
    return (
        <div>
            <AppBar id={styles.navBar} position="fixed">
                <Toolbar>
                    <Link to="/">
                        <IconButton className={styles.whiteMode}>
                            <HomeSharp />
                        </IconButton>
                    </Link>
                    <Link to="/" className={styles.whiteMode}>
                        <Typography variant="button">
                            MaPlace
                        </Typography>
                    </Link>
                    <span className={styles.spacer}></span>
                    <Link to="/write" className={styles.whiteMode}>
                        <Typography variant="button">
                            wirte
                        </Typography>
                    </Link>
                    <Login />

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;