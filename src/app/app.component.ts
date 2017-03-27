import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app works!';

    constructor(private authService: AuthService) {
        authService.onLogin.emit(true);
    }
    ngOnInit() {
        this.authService.me().subscribe(response => {
            // console.log(response);
        }, error => {
            this.authService.clearToken();
        });
    }
}
