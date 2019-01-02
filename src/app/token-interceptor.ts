import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServiceService } from "./service/login_service/login-service.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _loginSer: LoginServiceService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this._loginSer.getToken()}`
            }
        });
        return next.handle(request);
    }
}
