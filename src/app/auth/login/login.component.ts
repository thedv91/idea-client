import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";

import { AuthService } from "app/auth/auth.service";
import { Validate } from "app/utils/validate";
import { AuthErrorResponse, AuthModel } from "app/auth/auth.model";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private authService: AuthService;

    isFetching: boolean = false;

    authError: AuthErrorResponse = {
        username: [],
        password: []
    };

    loginForm: FormGroup;

    constructor(
        authService: AuthService,
        private router: Router) {

        this.authService = authService;
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    ngOnInit() {
    }

    onLoginClick() {
        this.isFetching = true;
        this.authService.login(this.loginForm.value).subscribe(data => {
            this.isFetching = false;
            this.authService.onLogin.emit(true);
            this.router.navigate(['/']);
        }, err => {
            this.authError = err;
            this.isFetching = false;
        });
    }

}
