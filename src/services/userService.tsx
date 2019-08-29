import axios from 'axios';
import { decrypting } from "../common";

export default class UserService {

    basicURL: string;

    constructor() {
        if(window.location.protocol === 'https:') {
            this.basicURL = `${window.location.protocol}//${window.location.hostname}:6500`;
        }
        else {
            this.basicURL = `${window.location.protocol}//${window.location.hostname}:5500`;
        }
        
    }


    getUsers(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedToken: any = localStorage.getItem('token');
                const token = await decrypting(hashedToken);
                const { data } = await axios.get(`${this.basicURL}/user/`, { headers: { "Authorization": `Bearer ${token.toString()}` } });
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

    tryLogin(email: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(`${this.basicURL}/user/login`, { Email: email, Password: password });
                resolve(data);
            } catch (err) {
                if (err.response === undefined) {
                    reject(err.Error)
                }
                else {
                    reject(err.response.data.error);
                }
            }
        })
    }

    Register(email: string, address: string, name: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(`${this.basicURL}/user/register`, { 'Email': email, 'Address': address, 'Name': name, 'Password': password });
                resolve(true);
            } catch (err) {
                if (err.response.data.error === undefined) {
                    reject(err.Error)
                }
                else {
                    reject(err.response.data.error);
                }
            }
        })
    }
}
