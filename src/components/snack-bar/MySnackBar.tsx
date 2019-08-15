import React, { SyntheticEvent } from 'react';
import { Snackbar, SnackbarContent, IconButton, Slide } from '@material-ui/core';
import { CheckCircle, Close, Error } from '@material-ui/icons';
import styles from './MySnackBar.module.scss';
import { TransitionProps } from '@material-ui/core/transitions/transition';


interface MySnackBarProps {
    open: boolean;
    handleClose: (event?: SyntheticEvent, reason?: string) => void;
    type: 'Success' | 'Error';
    message: string;
}

function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

const MySnackBar: React.FC<MySnackBarProps> = ({ open, handleClose, type, message }) => {

    return (
        <Snackbar
            key={type}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <SnackbarContent
                aria-describedby="client-snackbar"
                className={type === 'Success' ? styles.snackbarContainerSuccess : styles.snackbarContainerError}
                message={
                    <span className={styles.snackbarContents}>
                        {type === 'Success' ? <CheckCircle style={{ marginRight: "5px" }} /> : <Error style={{ marginRight: "5px" }} />}
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                ]}
            />

        </Snackbar>
    );
};

export default MySnackBar;