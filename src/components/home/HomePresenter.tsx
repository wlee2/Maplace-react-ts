import React from 'react';
import { HomeProps } from './HomeInterface';


const HomePresenter: React.FC<HomeProps> = (props: HomeProps) => {
    return (
        <div>
            <button
                onClick={props.startSubscribe}
                className={props.state.subscription.closed ? "" : "active"}
            >
                Get Current Location</button>
            <div>
                You are in {props.state.data.lat} / {props.state.data.lng}
            </div>
            {
                props.state.error ? (
                    <span className="error">{props.state.error}</span>
                ) : (
                        <span>stable</span>
                    )
            }
            <div>
                {
                    props.state.time.toUTCString() !== new Date(0).toUTCString()
                        ? props.state.time.toLocaleDateString()
                        : ""
                }
            </div>
        </div>
    );
};

export default HomePresenter;