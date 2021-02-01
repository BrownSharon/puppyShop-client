import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public searchINP:string = ""
  constructor(
    public _products: ProductsService,
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
    this._products.getAllProducts().subscribe(
      (res:ResponseInterface)=>{
        this._products.productsItemsArr = res.products
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      })
  }

  public allProducts(){
    this._products.getAllProducts().subscribe(
      (res:ResponseInterface)=>{
        this._products.productsItemsArr = res.products
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      }
    )
  }

  public getCategoryItems(id:number){
    this._products.getProductsById(id).subscribe(
      (res:ResponseInterface)=>{
        this._products.productsItemsArr = res.products
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      }
    )
  }

  public searchForProduct(name:string){
    this._products.getProductsByName(name).subscribe(
      (res:ResponseInterface)=>{
        this._products.productsItemsArr = res.products
      },
      (err:ResponseInterface)=>{
        console.log(err); 
        this._r.navigateByUrl('/welcome')
      }
    )
  }
  

}
