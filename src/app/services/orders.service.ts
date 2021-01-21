import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

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
    return this.http.head('http://localhost:10778/products/orders', {
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
