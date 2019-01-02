import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `rgb(48, 54, 65)`,
    fontColor: `white`,
    backgroundColor: `rgb(48, 54, 65)`,
    selectedListFontColor: `#04bd57`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: true
  };

  appitems = [
    {
      label: 'Sản phẩm',
      faIcon: 'fa fa-product-hunt',
      items: [
        { label: 'Thêm sản phẩm', link: 'admin/add-product', faIcon: 'fa fa-plus-square-o'},
        { label: 'Danh sách sản phẩm', link: 'admin/list-product', faIcon: 'fa fa-trash' }
      ]
    },
    {
      label: 'Tài khoản',
      faIcon: 'fa fa-user-o',
      items: [
        { label: 'Thêm tài khoản', link: 'admin/add-user', faIcon: 'fa fa-plus-square-o' },
        { label: 'Xóa tài khoản', link: 'admin/add-user', faIcon: 'fa fa-trash' }
      ]
    }
    ,
    {
      label: 'Màu sắc',
      link: '/admin/add-color',
      faIcon: 'fa fa-gift',
      // items: [
        
      // ]
    }
  ];
  constructor() { }

  ngOnInit() {
    

  }
  

  
}
