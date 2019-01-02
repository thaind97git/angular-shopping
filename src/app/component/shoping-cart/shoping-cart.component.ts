import { Component, OnInit } from '@angular/core';
import { ArrayCartService } from '../../service/array-cart-BehaviorSubject/array-cart.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  public arrayCart = this._arrayCartService.getArrayCart();
  public numProductDefault: any = [];
  constructor(private _arrayCartService: ArrayCartService, private _router: Router) { }

  ngOnInit() {
    
  }

  onNumDown(index) {
    for(let i = 0; i < this.arrayCart.length; i++){
      if(i == index){
        if(this.arrayCart[i].quantity > 0){
          this.arrayCart[i].quantity -= 1
          this.arrayCart[i].totalPrice -= this.arrayCart[i].product.price
          this.arrayCart[i].totalPrice = +this.arrayCart[i].totalPrice.toFixed(2)
        }
      }
    }
  }

  onNumUp(index) {
    for(let i = 0; i < this.arrayCart.length; i++){
      if(i == index){
        if(this.arrayCart[i].quantity < 20){
          this.arrayCart[i].quantity += 1
          this.arrayCart[i].totalPrice += this.arrayCart[i].product.price
          this.arrayCart[i].totalPrice = +this.arrayCart[i].totalPrice.toFixed(2)
        }
      }
    }
  }

  updateCart(){
    for(let cart of this.arrayCart){
      if(cart.quantity == 0){
        this.arrayCart.splice(this.arrayCart.indexOf(cart), 1)
      }
    }
    swal("Update Cart Success !", "", "success")
    localStorage.setItem('valueShoppingCart',JSON.stringify(this.arrayCart))
  }

  countinueBuy(){
    setTimeout(() =>{
      this._router.navigate(['/product-overview'])
    },300)
  }
}
