import React, { Component } from "react";
import SampleService from "../../services/sampleService";
import { Subscription } from "rxjs";
import { HomeState } from "./HomeInterface";
import HomePresenter from "./HomePresenter";

class Home extends Component<any, HomeState> {
    private sampleService: SampleService = new SampleService();

    state = {
        data: {
            lat: 0,
            lng: 0
        },
        error: "",
        time: new Date(0),
        subscription: Subscription.EMPTY
    };

    startSubscribe = () => {
        if (this.state.subscription.closed) {
            this.setState({
                subscription: this.sampleService.getData().subscribe(
                    res => {
                        console.log(res);
                        this.setState({
                            data: {
                                lat: res.coords.latitude,
                                lng: res.coords.longitude
                            },
                            time: new Date(res.timestamp)
                        });
                    },
                    err => {
                        console.log(err);
                        this.setState({
                            error: err.message
                        });
                    }
                )
            });
        } else {
            this.state.subscription.unsubscribe();
            this.setState({
                subscription: Subscription.EMPTY
            });
        }
    };

    render() {
        return (
            <HomePresenter {...this}></HomePresenter>
        );
    }
}

export default Home;
