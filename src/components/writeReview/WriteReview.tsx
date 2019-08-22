import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import FirstStep from './FirstStep';
import { QontoConnector, QontoStepIcon } from './Design';
import SecondStep from './SecondStep';

const WriteReview = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [stepData, setStepData] = useState({
        lat: 0,
        lng: 0,

    })
    const stepByStep = [
        <FirstStep activeStep={activeStep} setActiveStep={setActiveStep} setData={setStepData} />,
        <SecondStep activeStep={activeStep} setActiveStep={setActiveStep} data={stepData} setData={setStepData} />
    ];
    useEffect(() => {
        window.scrollTo(0,0);
    })
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>Identify Location</StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>Select</StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}>Write</StepLabel>
                </Step>
            </Stepper>
            {
                stepByStep[activeStep]
            }
        </>
    );
};

export default WriteReview;