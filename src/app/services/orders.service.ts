import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OrderInterface from '../interfaces/order.interface';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public path:string = 'http://localhost:10778/'

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

  public addOrder(body: any) {
    return this.http.post(`${this.path}orders`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getCountOrders() {
    return this.http.get(`${this.path}orders/count`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public lastOrderByUser() {
    return this.http.get(`${this.path}orders`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getReceipt(id: number, x: string) {
    const param = new HttpParams().set('filename', x);
    const options = {
      params: param
    }
    return this.http.get(`${this.path}orders/${id}/receipt`, {
      headers: {
        'Content-Type': 'application/pdf',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken,
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Origin': '*'
      },
      ...options,
      responseType: 'blob'
    })
  }

  public getDatesToDisable() {
    return this.http.get(`${this.path}orders/dates`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  
}
