import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "app/auth/auth.service";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {

    registerForm: FormGroup;

    error: Object | any;

    isFetching: boolean = false;

    constructor(
        formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) {

        this.registerForm = formBuilder.group({
            username: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
            email: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
            password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
            passwordConfirm: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
        });
    }

    ngOnInit() {
        this.error = null;
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    onRegisterClick() {
        this.isFetching = true;
        this.authService.register(this.registerForm.value).subscribe(response => {
            this.isFetching = false;
            this.authService.onLogin.emit(true);
            this.router.navigate(['/']);
        }, error => {
            this.isFetching = false;
            this.error = {
                message: error.message
            };
        });
    }

}
