import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public searchINP:string = ""
  public emptySearch: boolean = false

  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _r: Router

  ) { }

  ngOnInit(): void {
    this._products.getCategories().subscribe(
      (res:ResponseInterface)=>{
        this._products.productsCategoriesArr = res.categories
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      }
    )
    this._products.getAllProducts(this._carts.openCart.id).subscribe(
      (res:ResponseInterface)=>{
        console.log(res.products);
        
        this._products.productsItemsArr = res.products
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      })
      this._products.productsItemsFilteredArr = this._products.productsItemsArr
      if (this._products.productsItemsFilteredArr.length === 0){
        this.emptySearch = true
      }
  }

  public allProducts(){
    this.emptySearch = false
    this._products.productsItemsFilteredArr = this._products.productsItemsArr
    if (this._products.productsItemsFilteredArr.length === 0){
      this.emptySearch = true
    }
  }

  public getCategoryItems(id:number){
    this.emptySearch = false
    this._products.productsItemsFilteredArr = this._products.productsItemsArr.filter(p=> p.category_id === id)
    if (this._products.productsItemsFilteredArr.length === 0){
      this.emptySearch = true
    }
  }

  public searchForProduct(name:string){
    this.emptySearch = false
    this._products.productsItemsFilteredArr = this._products.productsItemsArr.filter(p=> p.name.toLowerCase().includes(name))
    if (this._products.productsItemsFilteredArr.length === 0){
      this.emptySearch = true
    }
  }
  
}
