import React, { useState, useEffect } from 'react';
import { ReviewModel } from '../../store/reviewStore';
import styles from './Review.module.scss';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Grid, IconButton, Button, Popper, Paper, List, Fade, ListItem, ClickAwayListener } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import GoogleMapReact from 'google-map-react';
import { google_api_key } from '../../secret'
import PlaceIcon from '@material-ui/icons/Place';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MapPinComponent from './MapPinComponent';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight, Delete, Edit } from '@material-ui/icons';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Skeleton from '@material-ui/lab/Skeleton';

interface ReviewProps {
    key: string;
    review: ReviewModel;
    email: string;
    deleteHandle: any;
    type?: any;
}

const Review: React.FC<ReviewProps> = ({ review, email, deleteHandle, type }) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadCount, setLoadCount] = useState(0);
    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<any>) => {
        if (!myAnchorEl) {
            setMyAnchorEl(event.currentTarget);
            setOpen(true)
        }
    }

    const handleAway = () => {
        setTimeout(() => {
            setMyAnchorEl(null);
            setOpen(false)
        }, 100)
    }

    const mapOptions = {
        clickableIcons: false,
        fullscreenControl: false
    };

    useEffect(() => {
        if (review.Photos.length === 0) {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        if (loadCount === review.Photos.length) {
            setLoading(false);
        }
    }, [loadCount])

    const imageLoaded = () => {
        setLoadCount(loadCount + 1)
    }



    return (
        <>
            <Card id={styles.cardContainer}>
                <CardHeader
                    avatar={
                        <Avatar src={review.AuthorPicture} />
                    }
                    title={
                        <Typography variant="h6" display="block" style={{ fontSize: '18px', letterSpacing: '0.3px' }}>
                            {review.LocationName}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="caption" color="textSecondary" display="block" component="span">
                            {review.Address}
                        </Typography>
                    }
                    action={
                        <div>
                            <IconButton style={step === review.Photos.length ? { padding: '10px', backgroundColor: 'whitesmoke' } : { padding: '10px' }} onClick={() => { setStep(review.Photos.length) }}>
                                <PlaceIcon id={step === review.Photos.length ? styles.selectedIcon : styles.enableIcon} />
                            </IconButton>
                            {
                                type !== "search" ?
                                    <>
                                        <IconButton id={styles.enableIcon} style={{ padding: '10px' }} onClick={(e) => { handleClick(e) }} onBlur={handleAway}>
                                            <MoreHorizIcon />
                                        </IconButton>
                                        {
                                            myAnchorEl ?
                                                <Popper open={open} placement={'bottom-start'} anchorEl={myAnchorEl} keepMounted transition>
                                                    {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleAway}>
                                                                    <List>
                                                                        <ListItem button style={{ fontSize: '12px' }} disabled={email === review.AuthorEmail ? false : true}>
                                                                            <Edit /> &nbsp; EDIT
                                                                        </ListItem>
                                                                        <ListItem button style={{ fontSize: '12px' }} onClick={() => { deleteHandle(review.ID) }} disabled={email === review.AuthorEmail ? false : true}>
                                                                            <Delete /> &nbsp; DELETE
                                                                        </ListItem>
                                                                    </List>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Fade>
                                                    )}
                                                </Popper> :
                                                null
                                        }
                                    </> : null
                            }
                        </div>
                    }
                />
                <CardMedia>
                    <div style={{ position: "relative" }}>
                        <div className={styles.carouselSkeleton} style={loading ? { display: "block" } : { display: "none" }}>
                            <Skeleton style={{ margin: '0' }} variant="rect" height="100%" width="100%" />
                        </div>
                        <SwipeableViews
                            className={styles.carousel}
                            index={step}
                            onChangeIndex={(i) => { setStep(i) }}
                            enableMouseEvents
                        >
                            {
                                review.Photos.map((photo, index) => {
                                    return (
                                        <div key={index} className={styles.imageBox} >
                                            <img className={styles.image} src={`http://${window.location.hostname}:5500/photo/${review.ID}/${photo}.png`} onLoad={imageLoaded} alt={review.LocationName} />
                                        </div>
                                    )

                                })
                            }
                            <div className={styles.mapContainer}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: google_api_key }}
                                    defaultCenter={{ lat: review.GeoLocation.Lat, lng: review.GeoLocation.Lng }}
                                    defaultZoom={15}
                                    draggable={false}
                                    options={mapOptions}
                                >
                                    <MapPinComponent
                                        lat={review.GeoLocation.Lat}
                                        lng={review.GeoLocation.Lng}
                                        text={review.LocationName}
                                        address={review.Address}
                                    />
                                </GoogleMapReact>
                            </div>
                        </SwipeableViews>
                        <div style={{ position: "absolute", bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            {
                                review.Photos.map((e, i) => {
                                    return (
                                        <div
                                            key={i} id={i === step ? styles.selectedDot : ''}
                                            className={styles.dot}
                                            onClick={() => { setStep(i) }}
                                        >
                                        </div>
                                    )
                                })
                            }
                            <div
                                id={review.Photos.length === step ? styles.selectedDot : ''}
                                className={styles.dot}
                                onClick={() => { setStep(review.Photos.length) }}
                            ></div>
                        </div>
                        <div style={{ position: "absolute", right: 0, top: 0, height: '100%', display: 'flex' }}>
                            <Button id={step !== review.Photos.length ? styles.arrow : styles.disableArrow} size="small" onClick={() => { setStep(step + 1) }} disabled={step === review.Photos.length}>
                                <KeyboardArrowRight />
                            </Button>
                        </div>
                        <div style={{ position: "absolute", left: 0, top: 0, height: '100%', display: 'flex' }}>
                            <Button id={step !== 0 ? styles.arrow : styles.disableArrow} size="small" onClick={() => { setStep(step - 1) }} disabled={step === 0}>
                                <KeyboardArrowLeft />
                            </Button>
                        </div>
                    </div>
                </CardMedia>
                <CardContent>
                    <Grid container style={{ marginBottom: "15px" }}>
                        <Grid item xs={6}>
                            <Rating value={review.PlaceRate} precision={0.5} size="small" emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: "flex-end" }}>
                            <Typography variant="caption" color="textSecondary" component="span">
                                {new Date(review.WrittenDate).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle2" component="p">
                        {review.AuthorEmail} &nbsp;
                        <Typography variant="body2" component="span">
                            {review.ReviewContentText}
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </>
    );
};

export default Review;