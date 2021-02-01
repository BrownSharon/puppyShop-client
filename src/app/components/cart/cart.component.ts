import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductInterface from 'src/app/interfaces/product.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public _carts: CartsService,
    public _products: ProductsService,
    public _r: Router

  ) { }

  ngOnInit(): void {
    this._carts.getCartItems().subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }

  public goToCheckout() {
    // change status cart to true (close)
    const body = { id: this._carts.openCart.id }
    this._carts.changeStatusCart(body).subscribe(
      (res: ResponseInterface) => {
        this._carts.openCart = res.openCart
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
    // redirect to order page
    this._r.navigateByUrl('/order')
  }

  public deleteAllItems() {
    // zero the amount in the products comp
    this._carts.cartItemsArr.map(cartItem => {
      this._products.productsItemsArr.map(p => {
        if (p.id === cartItem.product_id){
          p.product_amount = 0
        }
      })})
    // delete all items in cart 
    this._carts.deleteAllFromCart(this._carts.openCart.id).subscribe(
      (res: ResponseInterface) => { 
        this._carts.cartItemsArr = res.cartItems
        this._carts.totalCartPrice = 0
        this._r.navigateByUrl('/main')
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }

}
