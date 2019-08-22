import React, { Component } from 'react';
import { Snackbar, SnackbarContent, IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from './MySnackBar.module.scss';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { connect } from 'react-redux';
import { SnackbarAction } from '../../actions/snackbarActions';
import { bindActionCreators } from 'redux';
import { StoreState } from '../../store';


// interface MySnackBarProps {
//     open: boolean;
//     handleClose: (event?: SyntheticEvent, reason?: string) => void;
//     type: 'Success' | 'Error';
//     message: string;
// }

function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}



class MySnackBar extends Component<any> {
    render() {
        const { open, status, message } = this.props.snackbar;
        const { closeSnackbar } = this.props;
        return (
            <Snackbar
                key={status}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                TransitionComponent={SlideTransition}
            >
                <SnackbarContent
                    aria-describedby="client-snackbar"
                    className={status === 'Success' ? styles.snackbarContainerSuccess : styles.snackbarContainerError}
                    message={
                        <span className={styles.snackbarContents}>
                            {/* {status === 'Success' ? <CheckCircle style={{ marginRight: "5px" }} /> : <Error style={{ marginRight: "5px" }} />} */}
                            {status === 'Success' ? <span role="img" aria-label="Good" style={{marginRight: "5px", fontSize: "20px"}}>😎</span> : <span role="img" aria-label="Bad" style={{marginRight: "5px", fontSize: "20px"}}>😅</span>}
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" color="inherit" onClick={closeSnackbar}>
                            <Close />
                        </IconButton>
                    ]}
                />

            </Snackbar>
        );
    }
}
const mapStateToProps = (state: StoreState) => ({
    snackbar: state.snackbar
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(SnackbarAction as any, dispatch)
)(MySnackBar);
