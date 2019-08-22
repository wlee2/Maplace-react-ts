import axios from 'axios';
import { decrypting } from "../common";
import { ReviewModel } from '../store/reviewStore';

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
}
