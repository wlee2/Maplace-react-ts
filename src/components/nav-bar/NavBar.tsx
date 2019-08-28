import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { HomeSharp, Create, Search } from '@material-ui/icons';
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
                    <Link to="/search">
                        <IconButton className={styles.whiteMode}>
                            <Search />
                        </IconButton>
                    </Link>
                    <span className={styles.spacer}></span>
                    <Link to="/write" className={styles.whiteMode}>
                        <IconButton className={styles.whiteMode}>
                            <Create />
                        </IconButton>
                    </Link>
                    <Login />

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;