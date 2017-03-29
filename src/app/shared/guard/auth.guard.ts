import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "app/auth/auth.service";



@Injectable()
export class AuthGuard implements CanActivate {

    isLogedIn: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return Observable.create(observer => {
            this.authService.me().subscribe(res => {
                if (res) {
                    observer.next(true);
                } else {
                    this.router.navigate(['/auth/login']);
                    observer.next(false);
                }

                observer.complete();
            }, err => {
                this.router.navigate(['/auth/login']);
                observer.next(false);
                observer.complete();
            });

        });
    }
}
