import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from "../../constants";
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class DataProductsService {

  private _productURL = "../../../assets/data/mydata.json";
  private _allProducts = [];
  constructor(private _http: HttpClient) { }

    getProducts(): Observable<any> {
      return this._http.get("http://localhost:4200/assets/data/mydata.json")
    }
}
