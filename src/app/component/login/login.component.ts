import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/service/login_service/login-service.service';
import { Constants } from 'src/app/constants';
import { BaseService } from 'src/app/service/base_service/base.service';
import { User } from 'src/app/model/user';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user : User;
    public loginForm: FormGroup;
    public returnUrl: string;
    constructor( private _loginSer: LoginServiceService, 
                private _constants: Constants, private _baseSer: BaseService,
                private _toastr: ToastrService, private _route: ActivatedRoute,
                private _router: Router) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(3)])
        });

        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
    onSubmit(){
        const data = {
            'username': this.loginForm.value.username,
            'password': this.loginForm.value.password
        };
        this._loginSer.checkLogin(this._constants.CHECK_LOGIN,data).subscribe((res: any) => {
            if(!!res.data){
                this._baseSer.setUser(res.data);
                this.user = this._baseSer.getUser();
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', this.user.token);
                // console.log(this.user);
                this._router.navigateByUrl(this.returnUrl);
                // console.log(this.user);
            }else{
                // console.log(res);
                if(res.status === this._constants.NOTFOUND){
                    this._toastr.error('Error', 'Can not find user');
                }else
                if(res.status === this._constants.MISSING_DATA){
                    this._toastr.error('Error', 'Password wrong');
                }
            }
        },error =>{
            console.log(error);
        });
    }

}
