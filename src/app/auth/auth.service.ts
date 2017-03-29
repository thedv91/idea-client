import { Injectable, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthModel } from './auth.model';
import { User } from './user';
import { HttpService } from "app/services/http.service";

interface AuthResponse {
    token: string;
    user: User
}

@Injectable()
export class AuthService {

    private apiUrl = '/auth';

    authInfo: User;

    @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

    @Output() onLogin: EventEmitter<boolean> = new EventEmitter();

    isLogedIn: boolean = false;

    token: string;

    constructor(private http: HttpService) {

        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.onLogin.emit(true);
        }
    }

    login(auth: AuthModel): Observable<boolean> {
        return this.http.post(this.apiUrl + '/login', auth)
            .map((res: Response) => {
                const body = res.json() as AuthResponse;
                this.token = body.token;
                localStorage.setItem('token', this.token);
                this.authInfo = body.user;
                this.onLogin.emit(true);
                return true;
            })
            .catch(this.handleError);
    }

    register(auth: AuthModel): Observable<boolean> {
        return this.http.post(this.apiUrl + '/register', auth)
            .map((res: Response) => {
                const body = res.json() as AuthResponse;
                this.token = body.token;
                localStorage.setItem('token', this.token);
                this.authInfo = body.user;
                this.onLogin.emit(true);
                return body;
            })
            .catch(this.handleError);
    }

    logout(): Observable<boolean> {
        return Observable.create(observer => {
            localStorage.removeItem('token');
            this.isLogedIn = false;
            this.authInfo = null;
            this.onLogout.emit(true);
            observer.next(true);
            observer.complete();
        });

    }

    me(): Observable<boolean> {
        return this.http.get(this.apiUrl + '/me')
            .map((res: Response) => {
                const body = res.json() as User;
                this.authInfo = body;
                this.onLogin.emit(true);
                return body;
            })
            .catch(this.handleError);
    }

    clearToken() {
        localStorage.removeItem('token');
        this.onLogout.emit(true);
    }

    private extractData(res: Response) {

    }

    private handleError(error: Response | any) {
        let body: any;
        if (error instanceof Response) {
            body = error.json() || '';
        } else {
            body = error.message ? error.message : error.toString();
        }
        this.authInfo = null;
        return Observable.throw(body);
    }

}
