import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartItemInterface from 'src/app/interfaces/cartItem.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() public item: CartItemInterface
  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  ngOnInit(): void {
  }

  public increase() {
    this.item.product_amount++
  }

  public decrease() {
    if (this.item.product_amount > 1) {
      this.item.product_amount--
    }
  }

  public editItemAmount() {
    
    const body = {
      product_amount: this.item.product_amount,
      id: this.item.cartItem_id,
      cart_id: this.item.cart_id,
      total_price: (this.item.product_amount * this.item.price)
    }
    this._carts.editCartItem(body).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )

    // update the total cart price
    this._carts.totalPrice(this._carts.openCart.id).subscribe(
      (res: ResponseInterface) => {
        this._carts.totalCartPrice = res.totalCartPrice
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      },
    )

    // update the product_amount in products comp
    // zero the amount in products comp
    const productItem = this._products.productsItemsArr.find(p =>
      p.id === this.item.product_id)
    productItem.product_amount = this.item.product_amount
  }


  public deleteItem() {
    // zero the amount in products comp
    const productItem = this._products.productsItemsArr.find(p =>
      p.id === this.item.product_id)
    productItem.product_amount = 0

    // delete the item from cart
    const id = this.item.cartItem_id
    const cart_id = this.item.cart_id

    this._carts.deleteItemFromCart(id, cart_id).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
        this._carts.totalCartPrice -= this.item.product_total_price
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }

}
