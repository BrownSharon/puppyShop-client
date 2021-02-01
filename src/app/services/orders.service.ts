import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OrderInterface from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public lastOrder: OrderInterface
  public ordersCounter: number = 0
  constructor(
    private http: HttpClient
  ) { }

  public addOrder(body:any){
    return this.http.post('http://localhost:10778/orders', body,{
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  public getCountOrders(){
    return this.http.get('http://localhost:10778/orders/all', {
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
  }
  
  public lastOrderByUser(){
    return this.http.get('http://localhost:10778/orders', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  public getReceipt(id:number){
    return this.http.get(`http://localhost:10778/receipt/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

}
