import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/service/login_service/login-service.service';

@Injectable({
    providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {
    constructor(private _loginSer: LoginServiceService, private _router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this._loginSer.authenticate().subscribe((res: any) => {
            console.log(res);
        }, error => {
            console.log(error);
        });
        
        // const user = localStorage.getItem('user');
        // if (!user) {
        //     console.log("Please login");
        //     return false;
        // } else {
        //     const role = JSON.parse(user).role;
        //     if (role !== 'User' && role !== 'Admin') {
        //         console.log("Vui lòng login trước");
        //         return false;
        //     } else if (state.url.includes('/admin') && role !== 'Admin') {
        //         this._router.navigate(['home']);
        //         return false;
        //     }
        // }
        return true;
    }
}
