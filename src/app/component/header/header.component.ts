import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ArrayCartService } from '../../service/array-cart-BehaviorSubject/array-cart.service';
import { FadeAnimation } from '../../animations/fade-animation';
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [FadeAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public totalPrice = this.arrayCartService.getTotalPrice();
    /*Subscription*/
    public productCartSubscription;
    public productPriceSubscription;

    public arrayCart: any = this.arrayCartService.getArrayCart();

    constructor(
        private router: Router,
        private arrayCartService: ArrayCartService
    ) { }

    ngOnInit() {
        /*Cart Subject*/
        this.productCartSubscription = this.arrayCartService.productCartObj
            .pipe(filter(data => !!data && Object.keys(data).length > 0))
            .subscribe((newCart: any) => {
                this.arrayCart = newCart;
                this.totalPrice = !!this.arrayCart ? this.arrayCart.reduce((currenPrice, item) => {
                    return currenPrice + item.totalPrice;
                }, 0) : 0;
                this.toFixTotalPrice(this.arrayCart, this.totalPrice);
            });
		/*[ Cart ]*/
        $('.js-show-cart').on('click', function () {
            $('.js-panel-cart').addClass('show-header-cart');
        });

        $('.js-hide-cart').on('click', function () {
            $('.js-panel-cart').removeClass('show-header-cart');
        });
    }

    ngOnDestroy() {
        this.productCartSubscription.unsubscribe();
    }

    removeProduct(code, size) {
        if (this.arrayCart.length > 0) {
            let index;
            for (const cart of this.arrayCart) {
                if (cart.code === code && cart.size === size) {
                    swal( 'Remove ' + cart.product.name + ' Success !', 'Size: ' + cart.size + ' ', 'success');
                    index = this.arrayCart.indexOf(cart);
                }
            }
            this.arrayCart.splice(index, 1);

            /*Lưu vào trong localStogare*/
            localStorage.setItem('valueShoppingCart', JSON.stringify(this.arrayCart));
            /*Cập Nhật Lại Giá Tiền trong giỏ hàng*/
            this.totalPrice = !!this.arrayCart ? this.arrayCart.reduce((currentPrice, item) => {
                return currentPrice + item.totalPrice;
            }, 0) : 0;
            this.toFixTotalPrice(this.arrayCart, this.totalPrice);
        }
    }

    toFixTotalPrice(arrayCart, totalPrice){
        return totalPrice = !!arrayCart ? +totalPrice.toFixed(2) : totalPrice;
    }
    viewCart() {
        setTimeout(() => {
            this.router.navigate(['/shoping-cart']);
            $('.js-panel-cart').removeClass('show-header-cart');
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    $(window).scrollTop(0);
                }
            });
        }, 300);
    }
}
