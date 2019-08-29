import axios from 'axios';
import { decrypting } from "../common";

export default class PlaceService {
    basicURL: string;
    port: string;

    constructor() {
        if (window.location.protocol === 'https:') {
            this.port = '6500'
        }
        else {
            this.port = '5500'
        }
        this.basicURL = `${window.location.protocol}//${window.location.hostname}:${this.port}`;
    }

    getAutocomplete(input: string, lat: number, lng: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`${this.basicURL}/place/autocomplete?input=${input}&lat=${lat}&lng=${lng}`);
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
                const { data } = await axios.get(`${this.basicURL}/place/detail?id=${id}`);
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
                const { data } = await axios.get(`${this.basicURL}/place/autocomplete/city?input=${input}`);
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
                const { data } = await axios.get(`${this.basicURL}/review/search?searchString=${input}`);
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
