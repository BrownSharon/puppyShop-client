import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CategoryInterface from '../interfaces/category.interface';
import ProductInterface from '../interfaces/product.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public path:string = 'http://localhost:10778/'

  public productsItemsArr: ProductInterface[] = []
  public productsItemsFilteredArr: ProductInterface[] = []

  public productsCounter: number = 0
  public productsCategoriesArr: CategoryInterface[] = []

  public productForm: FormGroup
  public formStatus: string = "add"
  public productIdToEdit: number
  public productNameINP: string =""
  public productCategoryINP: number = 0
  public productPriceINP: number = 0
  public productImageINP: string = ""

  constructor(
    private http: HttpClient,
    public _user: UserService,
  ) { }

  public totalProductsCount() {
    return this.http.get(`${this.path}products/count`)
  }

  public getCategories() {
    return this.http.get(`${this.path}products/category`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getAllProducts(cart_id: number) {
    return this.http.get(`${this.path}products/?cart_id=${cart_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })

  }

public getAllProductsForAdmin(){
  return this.http.get(`${this.path}products`, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
}

  // admin only 
  public addProduct(body: any) {
    return this.http.post(`${this.path}products`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  // admin only
  public editProduct(id: number, body: any) {
    return this.http.put(`${this.path}products/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }
}
