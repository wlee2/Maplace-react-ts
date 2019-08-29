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
    basicURL: string;
    port: string;

    constructor() {
        
        if(window.location.protocol === 'https:') {
            this.port = '6500'
        }
        else {
            this.port = '5500'
        }
        this.basicURL = `${window.location.protocol}//${window.location.hostname}:${this.port}`;
    }

    getReviews(page: number): Promise<ReviewModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`${this.basicURL}/review?page=${page}`);
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
                const hashedToken: any = localStorage.getItem('token');
                const token = await decrypting(hashedToken);
                const { data } = await axios.post(`${this.basicURL}/review`, reviewRequestModel, { headers: { "Authorization": `Bearer ${token.toString()}` } });
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
                const hashedToken: any = localStorage.getItem('token');
                const token = await decrypting(hashedToken);
                const { data } = await axios.delete(`${this.basicURL}/review/${id}`, { headers: { "Authorization": `Bearer ${token.toString()}` } });
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
