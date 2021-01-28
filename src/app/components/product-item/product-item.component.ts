import { Component, Input, OnInit } from '@angular/core';
import ProductInterface from 'src/app/interfaces/product.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  
  @Input() public product : ProductInterface
  public amount : number = 0

  constructor(
    public _carts: CartsService
  ) { }

  ngOnInit(): void {
  }

public increase(){
 this.amount ++
}

public decrease(){
  if (this.amount > 0){
    this.amount --
  }
 }

 public addProductToCart(){

   const body = {product_id: this.product.id, 
                 product_amount: this.amount, 
                 product_total_price: this.amount*this.product.price, 
                 cart_id: this._carts.openCart.id}

   this._carts.addToCart(body).subscribe(
     (res:ResponseInterface)=>{
       this._carts.cartItemsArr=res.cartItems
     },
     (err:ResponseInterface)=>{
      console.log(err);
      
    },
   )
 }


}
