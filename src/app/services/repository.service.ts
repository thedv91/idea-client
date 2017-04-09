import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpService } from "app/services/http.service";


@Injectable()
export class RepositoryService {


    private apiUrl = '/repository';

    constructor(private http: HttpService) { }

    getList(params: any = []): Observable<any> {
        return this.http.get(this.apiUrl, { params: params }).map((response: Response) => {
            return response.json();
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    getRecord(code: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/${code}`).map((response: Response) => {
            return response.json();
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    create(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data).map((response: Response) => {
            return response.json();
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    addProduct(code: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${code}/product`, data).map((response: Response) => {
            return response.json();
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    remove(data: any): Observable<any> {
        if (Array.isArray(data)) {
            const codes = data.map((item, index) => {
                return item.code;
            });
            return this.http.delete(this.apiUrl, { params: { code: codes.toString() } }).map((response: Response) => {
                return response.json();
            }).catch((error: Response) => {
                return Observable.throw(error.json());
            });
        } else {
            return this.http.delete(this.apiUrl + '/' + data.code).map((response: Response) => {
                return response.json();
            }).catch((error: Response) => {
                return Observable.throw(error.json());
            });
        }

    }

}
