import React, { useEffect } from 'react';
import Review from '../review/Review';
import { ReviewModel } from '../../store/reviewStore';
import { StoreState } from '../../store';
import { connect } from 'react-redux';
import { ReviewAction } from '../../actions/reviewActions';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './Home.module.scss';

const Home: React.FC<any> = (props) => {
    useEffect(() => {
        if (props.reviews.length === 0) {
            props.reviewInit();
        }
    })

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
                        {
                            props.reviews.map((review: ReviewModel) => {
                                return <Review key={review.ID} review={review} />
                            })
                        }
                    </div>


            }
        </>
    );
};

function mapStateToProps(state: StoreState) {
    const { reviews } = state.reviews;
    const { page } = state.reviews;
    return { reviews, page }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(ReviewAction as any, dispatch)
)(Home);
