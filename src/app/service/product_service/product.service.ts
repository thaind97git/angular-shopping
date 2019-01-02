import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private _http: HttpClient, private _constants: Constants) { }

  getAllProduct(): Observable<any> {
    return this._http.get(this._constants.GET_PRODUCTS);
  }

  getSizesByCode(code): Observable<any> {
    return this._http.get(this._constants.GET_SIZE_BYCODE + code);
  }

  getProductByCode(code): Observable<any> {
    return this._http.get(this._constants.GET_PRODUCT_BYCODE + code);
  }

  createProduct(product): Observable<any> {
    return this._http.post(this._constants.CREATE_PRODUCT, product);
  }
}
