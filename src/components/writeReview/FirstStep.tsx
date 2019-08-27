import React, { useState, useEffect } from 'react';
import PlaceService from '../../services/placeService';
import { TextField, Popper, Fade, Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import GeoLocationService from '../../services/geoLocationService';
import { Subscription } from 'rxjs';

let timeout: any;
let locationSubscribe: Subscription;

const FirstStep: React.FC<any> = (props) => {
    const placeService = new PlaceService();
    const geoLocationService = new GeoLocationService();

    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [cityInput, setCityInput] = useState('');
    const [cityData, setCityData] = useState([]);
    const [geoLocation, setGeoLocation] = useState<null | Object | boolean>(null);
    const [errormsg, setErrormsg] = useState<null | string>(null)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (geoLocation === null) {
            locationSubscribe = geoLocationService.getData().subscribe(
                res => {
                    setGeoLocation({
                        lat: res.coords.latitude,
                        lng: res.coords.longitude
                    })
                },
                error => {
                    setErrormsg(error.message);
                    setGeoLocation(false);
                }
            )
        }
    }, [])

    useEffect(() => {
        return function cleanup() {
            if (locationSubscribe) {
                locationSubscribe.unsubscribe();
            }
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };
    })

    const setNextStep = (geo: any) => {
        props.setData({ lat: geo.lat, lng: geo.lng });
        props.setActiveStep(props.activeStep + 1);
    }

    const handleClick = (event: React.MouseEvent<any>) => {
        if (!myAnchorEl) {
            setMyAnchorEl(event.currentTarget);
        }
    }

    const handleAway = () => {
        if (myAnchorEl) {
            timeout = setTimeout(() => {
                setMyAnchorEl(null);
            }, 200)
        }
    }

    const handleChange = async (evt: any) => {
        setCityInput(evt.target.value);
        try {
            if (evt.target.value.length > 1) {
                const cityResults = await placeService.getCitys(cityInput);
                if (cityResults.length > 0) {
                    setOpen(true);
                    setCityData(cityResults);
                }
            }
            else {
                setOpen(false);
                setCityData([]);
            }
        } catch (err) {
            console.log('get city error => ', err)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography style={{ marginBottom: '40px', color: '#29487d' }} variant="button" gutterBottom>
                Select A Location Option For Searching
            </Typography>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!geoLocation ? true : false}
                    onClick={
                        () => {
                            if (geoLocation) {
                                setNextStep(geoLocation)
                            }
                        }
                    }
                >Use Current Location
                </Button>
            </div>
            {
                errormsg !== null ?
                    <>
                        <Typography variant="caption" color="error">
                            {errormsg}
                        </Typography>
                    </>
                    : null
            }

            <Typography style={{ marginTop: '30px' }} variant="button" color="textSecondary">
                Or
            </Typography>
            <div>
                <TextField
                    style={{ width: '200px' }}
                    label="Use Custom Location"
                    value={cityInput}
                    onChange={(e) => { handleChange(e) }}
                    onFocus={(e) => { handleClick(e) }}
                    onBlur={handleAway}
                    margin="normal"
                />
                {
                    myAnchorEl ?
                        <Popper style={{ width: myAnchorEl.clientWidth }} open={open} placement={'bottom-start'} anchorEl={myAnchorEl} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <List>
                                            {
                                                cityData.map((data: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <ListItem button onClick={() => { setNextStep(data.geolocation) }}>
                                                                <ListItemText primary={data.description} />
                                                            </ListItem>
                                                            {cityData.length - 1 === index ? null : <Divider />}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper> :
                        null
                }
            </div>
        </div>
    );
};

export default FirstStep;