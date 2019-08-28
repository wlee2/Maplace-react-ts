import React, { useState, useEffect } from 'react';
import { Paper, IconButton, InputBase, Popper, Fade, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import PlaceService from '../../services/placeService';
import styles from './Search.module.scss';
import { ReviewModel } from '../../store/reviewStore';
import Review from '../review/Review';

const Search = () => {
    const placeService = new PlaceService();

    const [searchInput, setSearchInput] = useState('');
    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [searchData, setSearchData] = useState<any>([]);
    const [reviews, setReviews] = useState([]);
    const [seleteHead, setSelectHead] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
                const searchResult = await placeService.getSearch(evt.target.value);
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

    const selectByType = (data: any, type: string) => {
        setSelectHead(type);
        setReviews(data);
    }

    const clear = () => {
        setSearchInput('');
        setOpen(false);
        setSearchData([]);
    }

    return (
        <div>

            <Paper id={styles.paper}>
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
                    searchInput.length !== 0 ?
                        <IconButton onClick={clear} >
                            <Clear />
                        </IconButton> : null
                }
                {
                    myAnchorEl ?
                        <Popper style={{ width: myAnchorEl.clientWidth }} open={open} placement={'bottom'} anchorEl={myAnchorEl} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        {
                                            searchData.length !== 0 ?
                                                <List>
                                                    <ListItem button onClick={() => {
                                                        selectByType(searchData.byName, "By Name")
                                                    }}
                                                    disabled={searchData.byName.length === 0} 
                                                    >
                                                        <ListItemText primary={"Results By Name: " + searchData.byName.length} />
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem button onClick={() => {
                                                        selectByType(searchData.byAddress, "By Address")
                                                    }}
                                                    disabled={searchData.byAddress.length === 0} 
                                                    >
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
            </Paper>
            <Typography style={{ textAlign: 'center', marginBottom: '30px'}} variant="h5">
                {seleteHead}
            </Typography>
            {
                reviews.map((review: ReviewModel) => {
                    return <Review key={review.ID} review={review} email='' deleteHandle={null} type="search"/>
                })
            }

        </div>
    );
};

export default Search;