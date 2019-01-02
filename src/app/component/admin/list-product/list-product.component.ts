import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../../constants';
import { ProductService } from '../../../service/product_service/product.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['STT', 'name', 'image', 'quantity', 'dateCreate', 'price', 'setting' ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public popoverTitle = 'Delete';
  public popoverMessage = 'Do you want delete this product ?';
  public confirmClicked = false;
  public cancelClicked = false;
  confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';

  constructor(private constants: Constants, private _productSer : ProductService,
    private _toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._productSer.getAllProduct().subscribe((res: any) => {
      const data = res.data;
      let count = 0;
      this.dataSource.data = data.map(x => ({
        position: ++count,
        name: x.name,
        image: x._images.Image,
        quantity: x.quantity,
        dateCreate: x.dateSubmitted,
        price: x.startPrice
      }));
    });
  }

}
