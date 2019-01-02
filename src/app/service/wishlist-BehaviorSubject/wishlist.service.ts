import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  private _readValueWishList = JSON.parse(localStorage.getItem('valueWishList'));
  private _arrayWishList: any;
  private _arrayWishListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([])
  public arrayWishListObj = this._arrayWishListSubject.asObservable()
  constructor() { }

  getArrayWishList(){
    if(!!this._readValueWishList && Object.keys(this._readValueWishList).length > 0){
      return this._arrayWishList = this._readValueWishList
    }else{
      return this._arrayWishList = []
    }
    
  }

  ArrayWishList(amount: number){
    this._arrayWishListSubject.next(amount)
  }
}
