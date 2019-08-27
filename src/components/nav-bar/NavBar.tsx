import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Popper, Fade, Paper, List, ListItem, ListItemText, Divider, InputBase } from '@material-ui/core';
import { HomeSharp, Create, Clear, Search, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import Login from '../login/Login';
import PlaceService from '../../services/placeService';

const NavBar = () => {
    const placeService = new PlaceService();

    const [searchStart, setSearchStart] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [searchData, setSearchData] = useState<any>([]);

    const handleClick = (event: any) => {
        if (!myAnchorEl) {
            setMyAnchorEl(event.currentTarget);
        }
    }

    const handleAway = () => {
        if (myAnchorEl) {
            setTimeout(() => {
                setMyAnchorEl(null);
            }, 100)
        }
    }

    const handleChange = async (evt: any) => {
        setSearchInput(evt.target.value);
        try {
            if (evt.target.value.length > 1) {
                setOpen(true);
                const searchResult = await placeService.getSearch(searchInput);
                if (searchResult.byName.length > 0 || searchResult.byAddress.length > 0) {
                    setSearchData(searchResult);
                }
                else {
                    setSearchData([]);
                }
            }
            else {
                setOpen(false);
                setSearchData([]);
            }
        } catch (err) {
            console.log('get search error => ', err)
        }
    }

    const clear = () => {
        setSearchInput('');
        setOpen(false);
        setSearchData([]);
    }


    return (
        <div>
            <AppBar id={styles.navBar} position="fixed">
                <Toolbar>
                    <Link to="/">
                        <IconButton className={styles.whiteMode}>
                            <HomeSharp />
                        </IconButton>
                    </Link>
                    <IconButton className={styles.whiteMode} onClick={() => { setSearchStart(true) }}>
                        <Search />
                    </IconButton>
                    {
                        searchStart ?
                            <Paper id={styles.paper}>
                                <IconButton onClick={() => { setSearchStart(false) }}>
                                    <ArrowBack />
                                </IconButton>
                                <InputBase
                                    style={{ padding: '0 10px' }}
                                    placeholder="Search"
                                    value={searchInput}
                                    onChange={(e) => { handleChange(e) }}
                                    onFocus={(e) => { handleClick(e) }}
                                    fullWidth
                                    onBlur={handleAway}
                                />
                                {
                                    searchInput.length !== 0 ? <Clear onClick={clear} /> : null
                                }
                                {
                                    myAnchorEl ?
                                        <Popper id={styles.popper} style={{ width: myAnchorEl.clientWidth }} open={open} placement={'bottom'} anchorEl={myAnchorEl} transition>
                                            {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Paper>
                                                        {
                                                            searchData.length !== 0 ?
                                                                <List>
                                                                    <ListItem button>
                                                                        <ListItemText primary={"Results By Name: " + searchData.byName.length} />
                                                                    </ListItem>
                                                                    <Divider />
                                                                    <ListItem button>
                                                                        <ListItemText primary={"Results By Address: " + searchData.byAddress.length} />
                                                                    </ListItem>
                                                                </List>
                                                                :
                                                                <List>
                                                                    <ListItem>
                                                                        <ListItemText primary="No results..." />
                                                                    </ListItem>
                                                                </List>
                                                        }
                                                    </Paper>
                                                </Fade>
                                            )}
                                        </Popper> :
                                        null
                                }
                            </Paper> : null
                    }


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