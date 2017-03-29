import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "app/auth/auth.service";
import { User } from "app/auth/user";

@Component({
    selector: 'app-page-nav',
    templateUrl: './page-nav.component.html',
    styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit, OnChanges, OnDestroy {

    isLogedIn: boolean = false;
    authInfo: User;
    logoutSubscription: any;
    loginSubscription: any;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.isLogedIn = this.authService.isLogedIn;
        this.logoutSubscription = this.authService.onLogout.subscribe(res => {
            this.authInfo = this.authService.authInfo;
            if (res) {
                this.isLogedIn = false;
            }
        });

        this.loginSubscription = this.authService.onLogin.subscribe(res => {
            this.authInfo = this.authService.authInfo;
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

        });

    }

    isAdmin() {
        return this.authInfo && this.authInfo.roles.includes('user');
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }

    ngOnDestroy() {
        this.logoutSubscription.unsubscribe();
        this.loginSubscription.unsubscribe();
    }
}
