import React, { useEffect, useState } from 'react';
import Review from '../review/Review';
import { ReviewModel } from '../../store/reviewStore';
import { StoreState } from '../../store';
import { connect } from 'react-redux';
import { ReviewAction } from '../../actions/reviewActions';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './Home.module.scss';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, CircularProgress, Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';

const Home: React.FC<any> = (props) => {
    const [scroll, setScroll] = useState(0);
    const [page, setPage] = useState(0);
    const [waiting, setWaiting] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [deleteID, setDeleteID] = useState<any>(null);
    const [refreshLoading, setRefreshLoading] = useState(false);

    useEffect(() => {
        props.reviewInit();
        window.addEventListener('scroll', listenToScroll);

        return function cleanup() {
            window.removeEventListener('scroll', listenToScroll);
        };
    }, [])

    useEffect(() => {
        if (scroll > 90 && !props.endofData && !waiting) {
            setPage(page + 1);
            setWaiting(true);
        }
    }, [scroll])

    useEffect(() => {
        if (page > 0 && waiting) {
            props.reviewUpdate(page, (err: any, success: boolean) => {
                if (err) {
                    console.log(err);
                }
                if (success) {
                    setWaiting(false);
                }
            })
        }
    }, [page])

    const listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrolled = winScroll / height * 100

        setScroll(scrolled)
    }

    const deleteHandle = (id: string) => {
        setDeleteID(id);
        setConfirmation(true);
    }

    const deleteConfirm = () => {
        setConfirmation(false);
        props.reviewDelete(deleteID, (status: any) => {
            if (status) {
                setPage(0);
                window.scrollTo(0, 0);
                setWaiting(false);
            }
            setDeleteID(null);
        });
    }

    const refreshing = () => {
        setRefreshLoading(true);
        props.reviewInit((done: boolean) => {
            if (done) {
                setPage(0);
                window.scrollTo(0, 0);
                setWaiting(false);
                setRefreshLoading(false);
            }
            else {
                setRefreshLoading(false);
            }
        });
    }

    return (
        <>
            {
                props.reviews.length === 0 ?
                    <div>
                        <div className={styles.preLoading}>
                            <FontAwesomeIcon className={styles.icon} icon={faMapMarkedAlt} size="6x" />
                        </div>
                        <p className={styles.logo}>MaPlace</p>
                    </div>
                    :
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }} >
                            <div style={{ position: 'relative' }}>
                                <Button id={refreshLoading ? styles.disabled : styles.enable} variant="contained" onClick={refreshing} disabled={refreshLoading}>
                                    Update
                                </Button>
                                {refreshLoading && <CircularProgress size={24} style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12 }} />}
                            </div>
                        </div>
                        {
                            props.reviews.map((review: ReviewModel) => {
                                return <Review key={review.ID} review={review} email={props.email} deleteHandle={deleteHandle} />
                            })
                        }
                        {
                            waiting ?
                                <div style={{ display: "flex", justifyContent: 'center', margin: '40px 0 100px 0' }}>
                                    <CircularProgress style={{ width: '50px', height: '50px' }} />
                                </div> :
                                null
                        }
                        <Fab id={styles.enable} style={{ position: "fixed", bottom: '20px', left: '50%', width: '35px', marginLeft: '-17.5px', height: '20px' }} onClick={() => { window.scrollTo(0, 0) }}>
                            <ArrowUpward />
                        </Fab>

                    </div>
            }

            <Dialog
                open={confirmation}
                onClose={() => { setConfirmation(false) }}
            >
                <DialogTitle>Are you sure to delete?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setConfirmation(false) }} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={deleteConfirm} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

function mapStateToProps(state: StoreState) {
    const { reviews } = state.reviews;
    const { page } = state.reviews;
    const { endofData } = state.reviews;
    const { email } = state.user
    return { reviews, page, endofData, email }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(ReviewAction as any, dispatch)
)(Home);
