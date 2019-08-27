import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import FirstStep from './FirstStep';
import { QontoConnector, QontoStepIcon } from './Design';
import SecondStep from './SecondStep';
import ThiredStep from './ThiredStep';
import ReviewService, { ReviewRequestModel } from '../../services/reviewService';
import { StoreState } from '../../store';
import { connect } from 'react-redux';
import { ReviewAction } from '../../actions/reviewActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';

const WriteReview: React.FC<any> = (props) => {
    const reviewService = new ReviewService();
    const [activeStep, setActiveStep] = useState(0);
    const [geoData, setGeoData] = useState({
        lat: 0,
        lng: 0,
    })
    const [placeDetail, setPlaceDetail] = useState<any>({});
    const [postDone, setPostDone] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const postReview = async (reviewInput: string, rateStar: number) => {
        try {
            let reviewRequestModel = new ReviewRequestModel();
            reviewRequestModel.Address = placeDetail.formatted_address;
            reviewRequestModel.GeoLocation = {
                Lat: placeDetail.geometry.location.lat,
                Lng: placeDetail.geometry.location.lng
            };
            reviewRequestModel.LocationName = placeDetail.name;
            reviewRequestModel.LocationReferenceID = placeDetail.place_id;
            if(placeDetail.photos) {
                reviewRequestModel.Photos = placeDetail.photos.map((photo: any) => {
                    return photo.photo_reference;
                });
            }
            reviewRequestModel.PlaceRate = rateStar;
            reviewRequestModel.ReviewContentText = reviewInput;
            const result = await reviewService.postReview(reviewRequestModel);
            if(result) {
                setPostDone(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const redirecting = () => {
        if(props.name === '') {
            props.accessDenied('Error', 'Login Required')
            return <Redirect to='/' />
        }
        if (postDone) {
            props.accessDenied('Success', 'The publication was successful.')
            props.reviewInit();
            return <Redirect to='/' />
        }
    }

    const stepByStep = [
        <FirstStep activeStep={activeStep} setActiveStep={setActiveStep} setData={setGeoData} />,
        <SecondStep activeStep={activeStep} setActiveStep={setActiveStep} data={geoData} setData={setPlaceDetail} />,
        <ThiredStep post={postReview} />
    ];

    return (
        <>
            {redirecting()}
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>GeoLocation</StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>Place</StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>Review</StepLabel>
                </Step>
            </Stepper>
            {
                stepByStep[activeStep]
            }
        </>
    );
};

function mapStateToProps(state: StoreState) {
    const { reviews } = state.reviews;
    const { page } = state.reviews;
    const { name } = state.user
    return { reviews, page, name }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(ReviewAction as any, dispatch)
)(WriteReview);