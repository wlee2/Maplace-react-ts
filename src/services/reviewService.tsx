import axios from 'axios';
import { decrypting } from "../common";
import { ReviewModel } from '../store/reviewStore';

export class ReviewRequestModel {
    ReviewContentText: string = '';
    PlaceRate: number = 0;
    LocationReferenceID: string = '';
    LocationName: string = '';
    Address: string = '';
    GeoLocation: {
        Lat: number,
        Lng: number
    } = { Lat: 0, Lng: 0 };
    Photos: Array<string> = [];
}

export default class ReviewService {
    token: string;

    constructor() {
        const hashedToken: any = localStorage.getItem('token');
        this.token = decrypting(hashedToken).toString();
    }

    getReviews(page: number): Promise<ReviewModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/review?page=${page}`);
                resolve(data);
            } catch (err) {
                if (err.response === undefined) {
                    reject(err.Error)
                }
                else {
                    reject(err.response.data);
                }
            }
        })
    }

    postReview(reviewRequestModel: ReviewRequestModel): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(`http://${window.location.hostname}:5500/review`, reviewRequestModel, { headers: { "Authorization": `Bearer ${this.token}` } });
                resolve(data);
            } catch (err) {
                if (err.response === undefined) {
                    reject(err.Error)
                }
                else {
                    reject(err.response.data);
                }
            }
        })
    }

    deleteReview(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(`http://${window.location.hostname}:5500/review/${id}`, { headers: { "Authorization": `Bearer ${this.token}` } });
                resolve(data);
            } catch (err) {
                if (err.response === undefined) {
                    reject(err.Error)
                }
                else {
                    reject(err.response.data);
                }
            }
        })
    }
}
