import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArrayCartService {
    /*Cookie*/
    private _readValueShoppingCart: any = JSON.parse(localStorage.getItem('valueShoppingCart'));

    private _arrayCart: any;
    private _totalPrice = 0;
    /*Product*/
    private _productCartSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public productCartObj = this._productCartSubject.asObservable();
    /*Price*/
    private _priceProductSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public priceProductObj = this._priceProductSubject.asObservable();
    constructor() { }

    getArrayCart() {
        //Get value Array Product Cookie
        if (typeof (Storage) !== "undefined") {
            if (!!this._readValueShoppingCart && Object.keys(this._readValueShoppingCart).length > 0) {
                return this._arrayCart = this._readValueShoppingCart;
            }
            return this._arrayCart = [];
        } else {
            console.log('Trình duyệt của bạn không hỗ trợ localStogare !');
        }

    }

    getTotalPrice() {
        if (typeof (Storage) !== "undefined") {
            if (!!this._readValueShoppingCart) {
                this._arrayCart = this._readValueShoppingCart;
                this._totalPrice = !!this._arrayCart ? this._arrayCart.reduce((currentPrice, item) => {
                    return currentPrice + item.totalPrice;
                }, 0) : 0;

                return this._totalPrice = this._totalPrice > 0 ? +this._totalPrice.toFixed(2) : this._totalPrice;
            } else {
                return 0;
            }
        } else {
            console.log('Trình duyệt của bạn không hỗ trợ localStogare !');
        }
    }

    pushOneProduct(productNew: any) {
        this._productCartSubject.next(productNew);
    }

    totalPrice(price: number) {
        this._priceProductSubject.next(price);
    }
}
