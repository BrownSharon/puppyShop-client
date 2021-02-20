import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartItemInterface from 'src/app/interfaces/cartItem.interface';
import ProductInterface from 'src/app/interfaces/product.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() public product: ProductInterface

  public productItemInCart: CartItemInterface
  public btnStatus: boolean = false
  public btnName: string = "Add"

  constructor(
    public _products: ProductsService,
    public _carts: CartsService,
    public _user: UserService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    if (this._carts.totalCartPrice === 0) {
      this.product.product_amount = 0
    }else{
      this.productItemInCart = this._carts.cartItemsArr.find(item => item.product_id === this.product.id)
      if (this.productItemInCart) {
        this.product.product_amount = this.productItemInCart.product_amount
        this.btnName = "Update"
      }
    }
  }

  public increase() {
    this.product.product_amount++
    this.btnStatus = true
  }

  public decrease() {
    if (this.product.product_amount > 1) {
      this.product.product_amount--
      this.btnStatus = true
    }
  }

  public async addProductToCart() {

    const body = {
      product_id: this.product.id,
      product_amount: this.product.product_amount,
      product_total_price: this.product.product_amount * this.product.price,
      cart_id: this._carts.openCart.id
    }

    this._carts.addToCart(body).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems
        this.productItemInCart = this._carts.cartItemsArr.find(item => item.product_id === this.product.id)
        if (this.productItemInCart) {
          this.productItemInCart.product_amount = this.product.product_amount
        }
        this._carts.totalCartPrice = res.totalCartPrice
        this.btnName = "Update"
        this.btnStatus = false
        this._carts.deletedItemFromCart = {} as ProductInterface
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      },
    )
  }

  public goToEditProduct(){
    this._products.productForm.patchValue({ productName: this.product.name })
    this._products.productForm.patchValue({ category: this.product.category_id })
    this._products.productForm.patchValue({ price: this.product.price })
    this._products.productForm.patchValue({ image: this.product.image })
    this._products.productIdToEdit = this.product.id
    this._products.formStatus = "edit"
  }


}
