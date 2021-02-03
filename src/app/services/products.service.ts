import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CategoryInterface from '../interfaces/category.interface';
import ProductInterface from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsItemsArr: ProductInterface[] = []
  public productsCounter: number = 0
  public productsCategoriesArr: CategoryInterface[] = []
  public productAmount: number = 0
  
  constructor(
    private http: HttpClient
  ) { }

  public totalProductsCount(){
    return this.http.get('http://localhost:10778/products')
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
  
  public getAllProducts(cart_id:number){
    return this.http.get(`http://localhost:10778/products/${cart_id}`, {
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  } 

  public getProductsById(cart_id:number,id:number){
    return this.http.get(`http://localhost:10778/products/${cart_id}?category_id=${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getProductsByName(cart_id:number, name:string){
    return this.http.get(`http://localhost:10778/products/${cart_id}?name=${name}`, {
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
