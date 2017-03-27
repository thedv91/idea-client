import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const roles: [string] = next.data['roles'] || [];
        if (roles.length) {
            return true;
        }
        return false;
    }
}
