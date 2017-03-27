import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

    isLogedIn: boolean = false;

    constructor(
        private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!localStorage.getItem('token')) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;

        // this.router.navigate(['/']);
        // return false;

    }
}
