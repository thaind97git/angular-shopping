import { Injectable } from '@angular/core';
@Injectable()
export class Constants {

      public HTTP = 'http://';
      public SERVER_IP = 'localhost';
      public SERVER_START;
      public CLIENT_PORT = ':4200';
      public SERVER_PORT = ':3000';
      public SERVER_PATH = '/jdn97';
      public SERVER_NAME = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH;


      //AUTHENTICATE
      public AUTHENTICATE = this.SERVER_NAME + '/authenticate';
      public CHECK_AUTH = this.SERVER_NAME + '/user/authenticate';

      //USER
      public USER_INFO = this.SERVER_NAME + '/user';
      public CHECK_LOGIN = this.SERVER_NAME + '/user/login';
      // API JSON
      public GET_PRODUCTS = this.SERVER_NAME + '/product/products';
      public CREATE_PRODUCT = this.SERVER_NAME + '/product/create';
      public GET_SIZE_BYCODE = this.SERVER_NAME + '/product/get-sizes/';
      public GET_PRODUCT_BYCODE = this.SERVER_NAME + '/product/get-productbycode/';

      public DUPLICATE = 422; // Lỗi bị trùng
      public NOTFOUND = 404; // Lỗi không tìm thấy
      public MISSING_DATA = 400; // Lỗi thiếu dữ liệu 
      public ERROR = 401; // Lỗi không xác định
      constructor() { }
}
