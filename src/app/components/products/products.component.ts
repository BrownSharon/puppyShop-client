import { Component, OnInit } from '@angular/core';
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

  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _user: UserService,
    public _r: Router

  ) { }

  ngOnInit(): void {
    this._products.getCategories().subscribe(
      (res: ResponseInterface) => {

        this._products.productsCategoriesArr = res.categories
      
        if (this._user.user.role === 2){
          this._products.getAllProducts(this._carts.openCart.id).subscribe(
          (res: ResponseInterface) => {
            this._products.productsItemsArr = res.products
            this._products.productsItemsFilteredArr = res.products
          },
          (err: ResponseInterface) => {
            console.log(err);
            this._r.navigateByUrl('/welcome')
          })
        }else{
          this._products.getAllProductsForAdmin().subscribe(
            (res: ResponseInterface) => {
              this._products.productsItemsArr = res.products
              this._products.productsItemsFilteredArr = res.products
            },
            (err: ResponseInterface) => {
              console.log(err);
              this._r.navigateByUrl('/welcome')
            })
        } 
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
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
    this._products.productsItemsFilteredArr = this._products.productsItemsArr.filter(p => p.category_id === id)
    if (this._products.productsItemsFilteredArr.length === 0) {
      this.emptySearchError = true
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
