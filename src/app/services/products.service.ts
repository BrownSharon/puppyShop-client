import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ProductInterface from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsItemsArr: ProductInterface[] = []

  constructor(
    private http: HttpClient
  ) { }

  public getCountProducts(){
    return this.http.head('http://localhost:10778/products/category')
  } 

  public getCategories(){
    return this.http.get('http://localhost:10778/products/category', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 
  
  // with search
  public getProducts(){
    return this.http.get('http://localhost:10778/products', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 
  
  // admin only 
  public addProduct(body:any){
    return this.http.post('http://localhost:10778/products/category',body ,{
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
  
  // admin only
  public editProduct(id:number, body:any){
    return this.http.put(`http://localhost:10778/products/${id}`,body ,{
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
}
