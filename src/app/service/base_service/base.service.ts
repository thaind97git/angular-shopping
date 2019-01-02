import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public user : User;
  constructor() { }

  setUser(user: User){
    return this.user = user;
  }

  getUser(){
    return this.user;
  }
}
