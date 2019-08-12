import { Observable } from "rxjs";
import axios from 'axios';

export default class UserService {
    getUsers(): Observable<any> {
        return new Observable(observable => {
            axios.get('https://localhost:6500/user/', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    observable.next(res.data);
                })
                .catch(err => {
                    observable.error(err.response);
                })
        })
    }

    tryLogin(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            axios.post('http://localhost:5500/user/login', { email: email, password: password })
                .then(res => {
                    observer.next(res.data);
                })
                .catch(err => {
                    observer.error(err.response);
                })
        })
    }
}
