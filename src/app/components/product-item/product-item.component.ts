import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductInterface from 'src/app/interfaces/product.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() public product: ProductInterface

  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    // const currentCartItem = this._carts.cartItemsArr.find( item => item.product_id == this.product.id)
    // if (currentCartItem?.cart_id > 0){
    //   this.amount = currentCartItem.product_amount
    // }
  }

  public increase() {
    this.product.product_amount++
  }

  public decrease() {
    if (this.product.product_amount > 1) {
      this.product.product_amount--
    }
  }

  public addProductToCart() {    
    const body = {
      product_id: this.product.id,
      product_amount: this.product.product_amount,
      product_total_price: this.product.product_amount * this.product.price,
      cart_id: this._carts.openCart.id
    }

    this._carts.addToCart(body).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
        const currentCartItem = this._carts.cartItemsArr.find(item => item.product_id == this.product.id)
        if (currentCartItem?.cart_id > 0) {
          this.product.product_amount = currentCartItem.product_amount
        }
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      },
    )

    this._carts.totalPrice(this._carts.openCart.id).subscribe(
      (res: ResponseInterface) => {
        this._carts.totalCartPrice = res.totalCartPrice
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      },
    )
  }


}
