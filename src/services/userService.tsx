import axios from 'axios';
import { decrypting } from "../common";

export default class UserService {
    getUsers(): Promise<any> {
        const hashedToken: any = localStorage.getItem('token');
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://${window.location.hostname}:5500/user/`, { headers: { "Authorization": `Bearer ${decrypting(hashedToken)}` } });
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
                const { data } = await axios.post(`http://${window.location.hostname}:5500/user/login`, { Email: email, Password: password });
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
                await axios.post(`http://${window.location.hostname}:5500/user/register`, { 'Email': email, 'Address': address, 'Name': name, 'Password': password });
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
