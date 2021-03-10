import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public searchINP: string = ""
  public emptySearchError: boolean = false
  public roleName: string
  public options: FormGroup
  public shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));  
  public cartViewStatus: boolean = false
  
  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _user: UserService,
    public _r: Router,
    public fb: FormBuilder
  ) {
    this.options = this.fb.group({
      fixed: false,
      top: 0
    });
   }

  ngOnInit(): void {

    this._user.user.role == 2 ? this.roleName = "user" : this.roleName = "admin"
    this._products.getCategories().subscribe(
      (res: ResponseInterface) => {
        this._products.productsCategoriesArr = res.categories
        if (this._user.user.role === 2) {
          this._r.navigateByUrl('main/user')
          this._carts.getOpenCartByUser().subscribe(
            (res: ResponseInterface) => {
              this._carts.openCart = res.cart
              this._carts.totalPrice(this._carts.openCart.id).subscribe(
                (res: ResponseInterface) => {
                  this._carts.totalCartPrice = res.totalCartPrice
                },
                (err: ResponseInterface) => {
                  console.log(err);
                  this._user.activeComponent = ""
                  this._r.navigateByUrl('welcome/login')
                })
              this._products.getAllProducts(this._carts.openCart.id).subscribe(
                (res: ResponseInterface) => {
                  this._products.productsItemsArr = res.products
                  this._products.productsItemsFilteredArr = res.products
                  this._r.navigateByUrl('main/user')
                },
                (err: ResponseInterface) => {
                  console.log(err);
                  this._r.navigateByUrl('welcome/login')
                })
            }, (err: ResponseInterface) => {
              console.log(err);
              this._user.activeComponent = ""
              this._r.navigateByUrl('welcome/login')
            })

        } else {
          this._r.navigateByUrl('main/admin')
          this._products.getAllProductsForAdmin().subscribe(
            (res: ResponseInterface) => {
              this._products.productsItemsArr = res.products
              this._products.productsItemsFilteredArr = res.products
              this._r.navigateByUrl('main/admin')
            },
            (err: ResponseInterface) => {
              console.log(err);
              this._r.navigateByUrl('welcome/login')
            })
        }
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('welcome/login')
      }
    )


  }

  public allProducts() {
    this.emptySearchError = false
    this._products.productsItemsFilteredArr = this._products.productsItemsArr
    if (this._products.productsItemsFilteredArr.length === 0) {
      this.emptySearchError = true
    }
  }

  public getCategoryItems(id: number) {
    this.emptySearchError = false
    this._products.productsItemsArr.map(p => document.getElementById(`btn${p.category_id}`).style.color="")
    this._products.productsItemsFilteredArr = this._products.productsItemsArr.filter(p => p.category_id === id)
    if (this._products.productsItemsFilteredArr.length === 0) {
      this.emptySearchError = true
    }else{
      
      document.getElementById(`btn${id}`).style.color="#d35806"
    }
  }

  public searchForProduct(name: string) {
    this.emptySearchError = false
    this._products.productsItemsFilteredArr = this._products.productsItemsArr.filter(p => p.name.toLowerCase().includes(name))
    if (this._products.productsItemsFilteredArr.length === 0) {
      this.emptySearchError = true
    }
  }

 
}
