import React from 'react';
import styles from './Review.module.scss';
import PlaceIcon from '@material-ui/icons/Place';

const MapPinComponent: React.FC<any> = ({ text, address }) => {
    return (
        <div className={styles.pinContainer}>
            <div className={styles.pinText}>
                <p className={styles.text}>
                    {text}
                </p>
            </div>
            <PlaceIcon id={styles.pinIcon} onClick={() => {window.open(`https://www.google.com/maps/place/${address}`, '_blank')}}/>
        </div>
    );
}

export default MapPinComponent;