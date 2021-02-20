import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import CartItemInterface from 'src/app/interfaces/cartItem.interface';
import ProductInterface from 'src/app/interfaces/product.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  
  @Input() public item: CartItemInterface
  public productItem: ProductInterface
  public updateBTN: boolean = false
  

  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    
  }

  public increase() {
    this.item.product_amount++
    this.updateBTN = true
  }

  public decrease() {
    if (this.item.product_amount > 1) {
      this.item.product_amount--
      this.updateBTN = true
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

        // update the product_amount in products comp
        this.productItem = this._products.productsItemsArr.find(p =>
          p.id === this.item.product_id)
        this.productItem.product_amount = this.item.product_amount
        
        // update the total cart price
        this._carts.totalCartPrice = res.totalCartPrice
       
        //set to disable updateBTN
        this.updateBTN = false
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }


  public deleteItem() {
    // zero the amount in products comp
    this.productItem = this._products.productsItemsArr.find(p =>
      p.id === this.item.product_id)
    this.productItem.product_amount = 0
    this._carts.deletedItemFromCart = this.productItem

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
