import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartItemInterface from 'src/app/interfaces/cartItem.interface';
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

  public productItemInCart: CartItemInterface
  
  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    this.productItemInCart = this._carts.cartItemsArr.find(item => item.product_id === this.product.id)
    if (this.productItemInCart){
    this.product.product_amount = this.productItemInCart.product_amount
    }  
  }

  public increase() {
    this.product.product_amount++
  }

  public decrease() {
    if (this.product.product_amount > 1) {
      this.product.product_amount--
    }
  }

  public async addProductToCart() {   
     
    const body = {
      product_id: this.product.id,
      product_amount: this.product.product_amount,
      product_total_price: this.product.product_amount * this.product.price,
      cart_id: this._carts.openCart.id
    }

    this._carts.addToCart(body).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
        if (this.productItemInCart?.cart_id > 0) {
          this.product.product_amount = this.productItemInCart.product_amount
        }
        this._carts.totalCartPrice = res.totalCartPrice
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      },
    )
  }


}
