import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OrderInterface from '../interfaces/order.interface';
import ResponseInterface from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public lastOrder: OrderInterface
  public currentOrder: OrderInterface
  public ordersCounter: number = 0
 
  public condition: any
  public date: Date 
  public DatesToDisable: any

  constructor(
    private http: HttpClient,
    public _r: Router
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
    return this.http.get('http://localhost:10778/orders/number', {
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
  }
  
  public lastOrderByUser(){
    return this.http.get('http://localhost:10778/orders/last', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  public getReceipt(id:number){
    return this.http.get(`http://localhost:10778/orders/receipt/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getDatesToDisable(){
    return this.http.get(`http://localhost:10778/orders/dates`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

}
