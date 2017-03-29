import { Injectable } from '@angular/core';
import { RequestMethod, RequestOptionsArgs, Http, RequestOptions, Headers, Request } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

@Injectable()
export class HttpService {

    private urlRoot: string = environment.host + '/api/v1';

    constructor(private _http: Http) {

    }

    private _createAuthHeaders(): Headers {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    public get(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Get, url, null, options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Post, url, body, options);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Put, url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Delete, url, null, options);
    }

    private _request(method: RequestMethod, relativeUrl: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
        let url = this.urlRoot + relativeUrl;
        let requestOptions = new RequestOptions(Object.assign({
            method: method,
            url: url,
            body: body,
            headers: this._createAuthHeaders()
        }, options));
        return this._http.request(new Request(requestOptions));
    }

}
