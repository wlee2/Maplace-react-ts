import { Observable } from "rxjs";
import axios from 'axios';
import { decrypting } from "../common";

export default class UserService {

    getUsers(): Observable<any> {
        return new Observable(observer => {
            const hashedToken: any = localStorage.getItem('token');

            axios.get('http://192.168.2.12:5500/user/', {
                headers: {
                    "Authorization": `Bearer ${decrypting(hashedToken)}`
                }
            })
                .then(res => {
                    observer.next(res.data);
                })
                .catch(err => {
                    if (err.response === undefined) {
                        observer.error(err.Error);
                    }
                    else {
                        observer.error(err.response.data);
                    }
                })
        })
    }

    tryLogin(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            axios.post('http://192.168.2.12:5500/user/login', { Email: email, Password: password })
                .then(res => {
                    observer.next(res.data);
                })
                .catch(err => {
                    if (err.response === undefined) {
                        observer.error(err.Error);
                    }
                    else {
                        observer.error(err.response.data.message);
                    }
                })
        })
    }

    async Register(email: string, address: string, name: string, password: string): Promise<boolean | string> {
        try {
            const data = await axios.post('http://192.168.2.12:5500/user/register', { 'Email': email, 'Address': address, 'Name': name, 'Password': password })
            console.log(data);
            return true;
        } catch (error) {
            if(error.response.data.error !== undefined) {
                return error.response.data.error;
            }
            else {
                return "Server Error";
            }
        }
    }

}
