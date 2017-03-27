import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";

declare const FB: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    isLogedIn: boolean = false;

    constructor() {

    }

    ngOnInit() {

    }


    ngOnDestroy() {

    }

}
