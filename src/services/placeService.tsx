import axios from 'axios';
import { decrypting } from "../common";

export default class PlaceService {
    token: string;

    constructor() {
        const hashedToken: any = localStorage.getItem('token');
        this.token = decrypting(hashedToken).toString();
    }

    getAutocomplete(input: string, lat: number, lng: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/place/autocomplete?input=${input}&lat=${lat}&lng=${lng}`);
                resolve(data.predictions);
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

    getDetail(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/place/detail?id=${id}`);
                resolve(data.result);
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
    
    getCitys(input: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/place/autocomplete/city?input=${input}`);
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

    getSearch(input: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/review/search?searchString=${input}`);
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
