import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product_service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedPoromotion = '0';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
  ];
  constructor(private _productSer: ProductService, private _toastr: ToastrService,
              private _constants: Constants) { }
  public productForm: FormGroup ;
  public productObj: Product ;
  ngOnInit() {
    this.productForm = new FormGroup({
      productCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      isPromotion: new FormControl(0),
      quantity: new FormControl(0),
      startPrice: new FormControl(0),
      percentPromotion: new FormControl(0),
      dateSubmitted: new FormControl(Date.now()),
      isActive: new FormControl(false),
      _subMenu: new FormControl(null),
      Image: new FormControl([]) ,
      SubImage: new FormControl([]),
      _colors: new FormControl([]),
      _sizes: new FormControl([]),
    });
  }

  onSubmit() {
    const formValue = this.productForm.value;
    this.productObj = new Product(
      formValue.productCode,
      formValue.name,
      formValue.description,
      formValue.isPromotion,
      formValue.quantity,
      formValue.startPrice,
      formValue.percentPromotion,
      formValue.dateSubmitted,
      formValue.isActive,
      formValue._subMenu,
      {
        'Image': formValue.Image,
        'SubImage': formValue.SubImage
      },
      formValue._colors,
      formValue._sizes
    );
    this._productSer.createProduct(this.productObj).subscribe((res) => {
      if(res.status === this._constants.DUPLICATE) {
        this._toastr.error('Error', 'Mã sản phẩm đã trùng !');
        return;
      }
      if(res.status === this._constants.MISSING_DATA) {
        this._toastr.error('Error', 'Vui lòng nhập đủ dữ liệu !');
        return;
      }
      if(res.status === this._constants.ERROR) {
        this._toastr.error('Error', 'Có lỗi khi gọi API !');
        return;
      }
      this._toastr.success('Success', 'tạo sản phẩm mới thành công !');
    }, err => {
        this._toastr.error('Error', 'Có lỗi khi tạo sản phẩm mới !');
    });
  }

}
