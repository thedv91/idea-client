import { Injectable } from '@angular/core';
import { Response } from "@angular/http";

import { HttpService } from "app/services/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductService {


    private apiUrl = '/product';

    isLogedIn: boolean = false;

    token: string;

    constructor(private http: HttpService) {

    }

    getList(): Observable<any> {
        return this.http.get(this.apiUrl).map((response: Response) => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    create(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data).map((response: Response) => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
