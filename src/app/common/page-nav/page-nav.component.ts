import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "app/auth/auth.service";

@Component({
    selector: 'app-page-nav',
    templateUrl: './page-nav.component.html',
    styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit, OnChanges, OnDestroy {

    isLogedIn: boolean = false;

    logoutSubscription: any;
    loginSubscription: any;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.isLogedIn = this.authService.isLogedIn;
        this.logoutSubscription = this.authService.onLogout.subscribe(res => {
            if (res) {
                this.isLogedIn = false;
            }
        });

        this.loginSubscription = this.authService.onLogin.subscribe(res => {
            if (res) {
                this.isLogedIn = true;
            }
        });
    }

    ngOnInit() {
    }

    onLogoutClick(): void {
        this.authService.logout().subscribe(res => {
            this.authService.onLogout.emit(true);
            this.router.navigate(['/auth/login']);
        }, err => {
            console.log(err);
        });

    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }

    ngOnDestroy() {
        this.logoutSubscription.unsubscribe();
        this.loginSubscription.unsubscribe();
    }
}
