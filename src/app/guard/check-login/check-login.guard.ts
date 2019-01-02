import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

    constructor(private _router: Router) { }
    canActivate ( next: ActivatedRouteSnapshot, state2: RouterStateSnapshot): boolean {
        if(localStorage.getItem('user')){
            return true;
        }
        this._router.navigate(['/login'], { queryParams: {returnUrl: state2.url} });
        return false;
    }
}
