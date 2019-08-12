import { Subscription } from "rxjs";

export interface HomeState {
    data: {
        lat: number;
        lng: number;
    };
    error: string;
    time: Date;
    subscription: Subscription;
}

export interface HomeProps {
    state: HomeState;
    startSubscribe: any;

}