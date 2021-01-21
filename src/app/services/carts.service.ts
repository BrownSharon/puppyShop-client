import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CartItemInterface from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  public cartItemsArr: CartItemInterface[]

  constructor(
    private http: HttpClient
  ) { }

  public addToCart(body:any){
    return this.http.post('http://localhost:10778/carts',body ,{
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  public deleteItemFromCart(id:number){
    return this.http.delete(`http://localhost:10778/cart/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 
  
  public deleteAllFromCart(id:number){
    return this.http.delete(`http://localhost:10778/cart/all/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 
  
  public totalPrice(id:number){
    return this.http.head(`http://localhost:10778/carts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 
  
  //with search
  public getCartItems(){
    return this.http.get('http://localhost:10778/carts', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  public getOpenCartByUser(id:number){
    return this.http.get(`http://localhost:10778/carts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }


}
