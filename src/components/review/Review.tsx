import React, { useState } from 'react';
import { ReviewModel } from '../../store/reviewStore';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './Review.module.scss';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Grid, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import GoogleMapReact from 'google-map-react';
import { google_api_key } from '../../secret'
import PlaceIcon from '@material-ui/icons/Place';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MapPinComponent from './MapPinComponent';

interface ReviewProps {
    key: string;
    review: ReviewModel;
}

const Review: React.FC<ReviewProps> = ({ review }) => {

    const [mapItem, setMapItem] = useState(0)
    const mapOptions = {
        clickableIcons: false,
        fullscreenControl: false
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
                            <IconButton style={{padding: '7px'}} onClick={() => { setMapItem(review.Photos.length) }}>
                                <PlaceIcon id={mapItem === 2 ? styles.selectedIcon : styles.enableIcon} />
                            </IconButton>
                            <IconButton style={{padding: '7px'}}>
                                <MoreHorizIcon id={styles.enableIcon} />
                            </IconButton>
                        </div>
                    }
                />
                <CardMedia>
                    <Carousel className={styles.carousel} emulateTouch selectedItem={mapItem} showThumbs={false} showStatus={false} onChange={(e) => { setMapItem(e) }}>
                        {
                            review.Photos.map((photo, index) => {
                                return (
                                    <div key={index} className={styles.imageBox} >
                                        <img className={styles.image} src={`http://${window.location.hostname}:5500/photo/${review.ID}/${photo}.png`} alt={review.LocationName} />
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
                    </Carousel>
                </CardMedia>
                <CardContent>
                    <Grid container style={{ marginBottom: "15px" }}>
                        <Grid item xs={6}>
                            <Typography variant="caption" color="textSecondary" component="span">
                                {new Date(review.WrittenDate).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating style={{ justifyContent: "flex-end" }} value={review.PlaceRate} readOnly />
                        </Grid>
                    </Grid>
                    <Typography variant="body2" component="p">
                        {review.AuthorEmail} &ensp;
                        <Typography variant="body2" color="textSecondary" component="span">
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