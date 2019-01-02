import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import { User } from '../../model/user';
import { Constants} from '../../constants';
import { BaseService } from '../base_service/base.service';
import { catchError, map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
// import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class LoginServiceService {
    public user: User;
    public isLogin = false;
    constructor(private _http: HttpClient, private _constant: Constants, private _baseSer: BaseService) { }

    public getUser(): User{
        return this.user;
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): Boolean {
        const token = this.getToken();
        return tokenNotExpired(null, token);
    }

    checkLogin(apiUrl, data): Observable<any>{
        return this._http.post(apiUrl, data);
    }

    getAuthenticate(apiUrl, headers): Observable<any>{
        return this._http.post(apiUrl, headers);
    }

    authenticate(): Observable<any> {
        const token = localStorage.getItem('token');
        if(!token){
            return Observable.of(false);
        }
        const requestOptionHeader = {
            headers: this.authorizationHeader()
        };
        console.log(requestOptionHeader);
        console.log(this.getAuthenticate(this._constant.CHECK_AUTH, requestOptionHeader));
        return this.getAuthenticate(this._constant.CHECK_AUTH, requestOptionHeader)
            .pipe(map(res => console.log(res) ), 
            catchError(error => throwError(error)));
        // return Observable.of(this.isLogin);
    }

    authorizationHeader() {
        let headers = new HttpHeaders();
        const token = localStorage.getItem('token');
        if (!!token) {
            headers = headers.append('Content-Type', 'application/json');
            headers = headers.append('x-access-token', token);
        }
        return headers;
    }




}
