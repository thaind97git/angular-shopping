import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
declare var $: any;
import swal from 'sweetalert';
import { ArrayCartService } from '../../service/array-cart-BehaviorSubject/array-cart.service';
import { ProductService } from '../../service/product_service/product.service';

@Component({
	selector: 'app-product-overview',
	templateUrl: './product-overview.component.html',
	styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
	// Public
	public allProducts: any = [];
	public getProductByCode: any = null;
	public arrayImages: any = {
		Image: '',
		SubImage: [
			'', '', ''
		]
	};
	public productCart: any = {};
	public numProductDefault: any = 1;
	public lengthInput: number;

	/*Service*/
	public priceSubject: number = this._arrayCartSer.getTotalPrice();
	public arrayCart: any = this._arrayCartSer.getArrayCart();

	constructor(
		private _arrayCartSer: ArrayCartService,
		private _productSer: ProductService
	) { }

	ngOnInit() {
		this._productSer.getAllProduct().subscribe((res: any) => {
			this.allProducts = res.data;
		});
		$('.js-addwish-b2').on('click', function (e) {
			e.preventDefault();
		});
		$('.js-addwish-b2').on('click', function () {
			swal('nameProduct', 'is added to wishlist !', 'success');

			$(this).addClass('js-addedwish-b2');
			$(this).off('click');
		});
		$('.js-addwish-detail').on('click', function () {
			swal('nameProduct', 'is added to wishlist !', 'success');

			$(this).addClass('js-addedwish-detail');
			$(this).off('click');
		});
	}

	isInteger(value) {
		if (parseInt(value).toString() === value || value !== '') {
			return true;
		} else {
			return false;
		}
	}

	quickView(code) {
		this.numProductDefault = 1;
		// Show Product
		$('.js-modal1').addClass('show-modal1');
		$('.js-hide-modal1').on('click', function () {
			$('.js-modal1').removeClass('show-modal1');
		});
		this.getProductByCode = this.allProducts.find(q => q.productCode === code);
		if(!!this.getProductByCode){
			this.arrayImages = this.getProductByCode._images;
		}
		// 	if (code === this.allProducts[i].productCode) {
		// 		this.getProductByCode = this.allProducts[i]; /*product by code*/
		// 		this.arrayImages = this.getProductByCode._images; /*array images*/
		// 	}
		// }
	}

	addToCart(reftValue) {
		let isExistCart = false;
		const product = this.getProductByCode;
		let newArrayCart: any = [];
		let productCompare: any = {};
		if (product) {
			if (this.numProductDefault >= product.quantity) {
				swal(product.name, 'The product is out of stock !', 'error');
				return;
			}
			if ($('.js-select2.size').val().toString() === 'none') {
				swal(product.name, 'Please choose one size !', 'error');
				return;
			}
			if (this.isInteger(reftValue.value) === true && this.numProductDefault !== 0) {
				this.numProductDefault = parseInt(reftValue.value);
				/*Product mới add*/
				this.productCart = {
					code: product.productCode,
					totalPrice: product.startPrice * this.numProductDefault,
					product: product,
					size: $('.js-select2.size').val(),
					color: $('.js-select2.color').val(),
					quantity: this.numProductDefault
				};
				// Nếu cart chưa có sản phẩm nào thì add thằng
				if (this.arrayCart.length === 0) {
					this.arrayCart.push(this.productCart);
					/*Subject*/
					this._arrayCartSer.pushOneProduct(this.arrayCart);
				} else {
					/*Đổi mảng arrayCart sang một mảng mưới chỉ có 3 tham số để compare Object*/
					newArrayCart = this.arrayCart.map(item => ({
						code: item.product.productCode,
						size: item.size,
						color: item.color,
						price: item.product.startPrice
					}));
					/*Đổi product mới add thành một product mới để compare*/
					productCompare = {
						code: product.productCode,
						size: $('.js-select2.size').val(),
						color: $('.js-select2.color').val(),
						price: product.startPrice
					};
					for (const item of newArrayCart) {
						if (JSON.stringify(item) === JSON.stringify(productCompare)) {
							isExistCart = true;
							// Tìm xem trong mảng cart thằng nào trùng để cộng giá trị
							for (const item2 of this.arrayCart) {
								if (item2.code === this.productCart.code &&
									item2.size === this.productCart.size &&
									item2.color === this.productCart.color
								) {
									item2.totalPrice += this.productCart.totalPrice;
									item2.quantity += this.productCart.quantity;
									/*Subject*/
									this._arrayCartSer.pushOneProduct(this.arrayCart);
									swal(product.name, 'is added to cart !', 'success');
									return;
								}
							}
						}
					}
					if (isExistCart === false) {
						this.arrayCart.push(this.productCart);
						/*Subject*/
						this._arrayCartSer.pushOneProduct(this.arrayCart);
					}
				}
				/*Lưu vào trong localStogare*/
				localStorage.setItem('valueShoppingCart', JSON.stringify(this.arrayCart));
				swal(product.name, 'Is added to cart !', 'success');
			} else {
				swal(product.name, 'Add to cart fail !', 'error');
			}
		}
	}

	onNumDown(reftValue) {
		this.numProductDefault = parseInt(reftValue.value);
		if (reftValue.value === '') {
			this.numProductDefault = 1;
		}
		if (Number(reftValue.value) > 1) {
			this.numProductDefault -= 1;
		}
	}

	onNumUp(reftValue) {
		this.numProductDefault = parseInt(reftValue.value);
		if (reftValue.value === '') {
			this.numProductDefault = 1;
		} else {
			this.numProductDefault += 1;
		}
	}

	onKeyPress(evt) {
		const charCode = evt.which ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	onKeyUpInput(event) {
		this.numProductDefault = Number(event.target.value);
	}

	/*Wish List*/
	addtoWishList(event, id) {
		event.preventDefault();
		swal('WishList', 'You must be login !', 'error');
	}
}
