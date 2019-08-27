import React, { useState } from 'react';
import styles from './Review.module.scss';
import PlaceIcon from '@material-ui/icons/Place';
import { Paper, Popper, Typography, Button } from '@material-ui/core';

const MapPinComponent: React.FC<any> = ({ text, address }) => {
    const [myAnchorEl, setMyAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<any>) => {
        if (!myAnchorEl) {
            setMyAnchorEl(event.currentTarget);
            setOpen(true)
        }
    }

    const handleAway = () => {
        setMyAnchorEl(null);
        setOpen(false)
    }

    return (
        <div className={styles.pinContainer} onMouseLeave={handleAway}>
            <PlaceIcon id={styles.pinIcon} onMouseEnter={handleClick} onBlur={handleAway}/>
            {
                myAnchorEl ?
                    <Popper open={open} placement={'top'} anchorEl={myAnchorEl}>
                        <Paper style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="body1" component="p" style={{ padding: "10px", textAlign: "center" }}>
                                {text}
                            </Typography>
                            <Button style={{fontSize: '10px'}} onClick={() => { window.open(`https://www.google.com/maps/place/${address}`, '_blank') }}>
                                open in google map
                            </Button>  
                        </Paper>
                    </Popper> :
                    null
            }
        </div>
    );
}

export default MapPinComponent;