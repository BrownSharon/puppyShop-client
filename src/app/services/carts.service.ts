import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from '../interfaces/cart.interface';
import CartItemInterface from '../interfaces/cartItem.interface';
import ProductInterface from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  public path: string = 'http://localhost:10778/'

  public cartItemsArr: CartItemInterface[] = []

  public openCart: CartInterface
  public totalCartPrice: number
  public cartsCounter: number = 0
  public cartStatus: boolean = false
  public deletedItemFromCart: ProductInterface
  public Search: string = null;

  constructor(
    private http: HttpClient,
    private _r: Router
  ) { }

  public addToCart(body: any, cart_id: number) {
    return this.http.post(`${this.path}carts/${cart_id}/items`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public deleteItemFromCart(id: number, cart_id: number) {
    return this.http.delete(`${this.path}carts/${cart_id}/items/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public deleteAllFromCart(id: number) {
    return this.http.delete(`${this.path}carts/${id}/items`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public totalPrice(id: number) {
    return this.http.get(`${this.path}carts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getCartItems() {
    if (this.openCart?.id) {
      return this.http.get(`${this.path}${this.openCart.id}/items`, {
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.token,
          'refreshToken': localStorage.refreshToken
        }
      })
    } else {
      this._r.navigateByUrl('/welcome')
    }
  }

  public getOpenCartByUser() {
    return this.http.get(`${this.path}carts`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getNewCart() {
    const body = {}
    return this.http.post(`${this.path}carts`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public changeStatusCart(cart_id: number) {
    return this.http.put(`${this.path}carts/${cart_id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public editCartItem(body: object, cart_id: number, item_id: number) {
    return this.http.put(`${this.path}carts/${cart_id}/items/${item_id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

}
