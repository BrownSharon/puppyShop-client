import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from '../interfaces/cart.interface';
import CartItemInterface from '../interfaces/cartItem.interface';
import ProductInterface from '../interfaces/product.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  public cartItemsArr: CartItemInterface[] = []
  public cartItemsFilteredArr: CartItemInterface[] = []
  
  public openCart: CartInterface
  public totalCartPrice: number 
  public cartsCounter: number = 0
  public cartStatus: boolean = false
  public deletedItemFromCart: ProductInterface

  constructor(
    private http: HttpClient,
    private _r: Router
  ) { }

  public addToCart(body: any) {
    return this.http.post('http://localhost:10778/itemsCart/', body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public deleteItemFromCart(id: number, cart_id: number) {
    return this.http.delete(`http://localhost:10778/itemsCart/${id}/${cart_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public deleteAllFromCart(id: number) {
    return this.http.delete(`http://localhost:10778/carts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public totalPrice(id: number) {
    return this.http.get(`http://localhost:10778/carts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getCartItems() {
    if (this.openCart?.id) {
      return this.http.get(`http://localhost:10778/itemsCart?cart_id=${this.openCart.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.token,
          'refreshToken': localStorage.refreshToken
        }
      })
    }else{
      this._r.navigateByUrl('/welcome')
    }
  }

  public getOpenCartByUser() {
    return this.http.get(`http://localhost:10778/carts`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getNewCart() {
    const body = {}
    return this.http.post(`http://localhost:10778/carts`, body,{
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public changeStatusCart(body: any) {
    return this.http.put(`http://localhost:10778/carts/`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public editCartItem(body:object){
    return this.http.put(`http://localhost:10778/itemsCart/`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

}
