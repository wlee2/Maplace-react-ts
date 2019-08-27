import React, { useState, useEffect } from 'react';
import { TextField, Fade, Paper, List, ListItem, ListItemText, Divider, Popper, Typography, Button } from '@material-ui/core';
import PlaceService from '../../services/placeService';
import GoogleMapReact from 'google-map-react';
import { google_api_key } from '../../secret';
import MapPinComponent from '../review/MapPinComponent';

const SecondStep: React.FC<any> = (props) => {
    const placeService = new PlaceService();
    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchData, serSearchData] = useState([]);
    const [selectData, setSelectData] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [timer, setTimer] = useState<any>(null);

    const mapOptions = {
        clickableIcons: false,
        fullscreenControl: false
    }
    
    useEffect(() => {
        return function cleanup() {
            if (timer) {
                clearTimeout(timer);
                setTimer(null)
            }
        };
    })

    const handleChange = async (evt: any) => {
        setSearchInput(evt.target.value);
        try {
            if (evt.target.value.length > 1) {
                const searchResult = await placeService.getAutocomplete(searchInput, props.data.lat, props.data.lng);
                if (searchResult.length > 0) {
                    setOpen(true);
                    serSearchData(searchResult);
                }
            }
            else {
                setOpen(false);
                serSearchData([]);
            }
        } catch (err) {
            console.log('get city error => ', err)
        }
    }

    const handleClick = (event: React.MouseEvent<any>) => {
        if (!myAnchorEl) {
            setMyAnchorEl(event.currentTarget);
        }
    }

    const handleAway = () => {
        if (myAnchorEl) {
            setTimer(setTimeout(() => {
                setMyAnchorEl(null);
            }, 200))
        }
    }

    const handleSelect = async (data: any) => {
        try {
            const locationDetail = await placeService.getDetail(data.place_id);
            setSelectData(locationDetail);
            setMyAnchorEl(null);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleNext = () => {
        props.setData(selectData);
        props.setActiveStep(props.activeStep + 1);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <Typography style={{ marginBottom: '40px', color: '#29487d' }} variant="button" gutterBottom>
                    Please Select A Place To Review
                </Typography>
            </div>
            <div>
                <TextField
                    style={{ width: '300px' }}
                    label="Select Place"
                    value={searchInput}
                    onChange={(e) => { handleChange(e) }}
                    onClick={(e) => { handleClick(e) }}
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
                                                searchData.map((data: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <ListItem style={{paddingTop: '0px', paddingBottom: '0px'}} button onClick={() => { handleSelect(data) }}>
                                                                <ListItemText primary={data.structured_formatting.main_text} secondary={data.structured_formatting.secondary_text} />
                                                            </ListItem>
                                                            {searchData.length - 1 === index ? null : <Divider />}
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
            {
                selectData ?
                    <div style={{ margin: "30px 0 20px 0", height: '300px', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: google_api_key }}
                            center={{ lat: selectData.geometry.location.lat, lng: selectData.geometry.location.lng }}
                            defaultZoom={15}
                            draggable={false}
                            yesIWantToUseGoogleMapApiInternals
                            options={mapOptions}
                        >
                            <MapPinComponent
                                lat={selectData.geometry.location.lat}
                                lng={selectData.geometry.location.lng}
                                text={selectData.name}
                                address={selectData.formatted_address}
                            />
                        </GoogleMapReact>
                    </div>
                    :
                    <div style={{ margin: "30px 0 20px 0", height: '300px', width: '100%' }}></div>
            }
            <Button variant="contained" color="primary" onClick={handleNext} disabled={!selectData ? true : false}>
                Confirm
            </Button>

        </div>

    );
};

export default SecondStep;