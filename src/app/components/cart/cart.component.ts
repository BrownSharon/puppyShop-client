import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public searchINP: string = ""
  public color: string = "null"
  @Output() searched = new EventEmitter<string>();


  constructor(
    public _carts: CartsService,
    public _products: ProductsService,
    public _orders: OrdersService,
    public _user: UserService,
    public _r: Router

  ) { }

  ngOnInit(): void {
    this._r.url === '/order' ? this._carts.cartStatus = true : this._carts.cartStatus = false
    if (!this._user.user?.id) {
      this._user.user = this._user.decodeToken(localStorage.token, localStorage.refreshToken)
    }
    if (!this._user.user?.isLogin) {
      this._user.activeComponent = ""
      this._r.navigateByUrl('welcome/login')
    }
    if (this._user.user.role === 2){
    this._carts.getOpenCartByUser().subscribe(
      (res: ResponseInterface) => {
        if (res.cart) {
          this._carts.openCart = res.cart
          this._carts.getCartItems().subscribe(
            (res: ResponseInterface) => { 
              if (res.cartItems) {
                this._carts.cartItemsArr = res.cartItems
              }
            },
            (err: ResponseInterface) => {
            }
          )
        } else {
          this._r.navigateByUrl('welcome/login')
        }
      },
      (err: ResponseInterface) => {
        err.status === 401 ? this._r.navigateByUrl('main/admin') : this._r.navigateByUrl('welcome/login')
      }
    )
    }
  }

  public goToCheckout() {
    this._r.navigateByUrl('/order')
  }

  public deleteAllItems() {
    // zero the amount in the products comp
    this._carts.cartItemsArr.map(cartItem => {
      this._products.productsItemsArr.map(p => {
        if (p.id === cartItem.product_id) {
          p.product_amount = 0
        }
      })
    })
    // delete all items in cart 
    this._carts.deleteAllFromCart(this._carts.openCart.id).subscribe(
      (res: ResponseInterface) => {
        this._carts.cartItemsArr = res.cartItems

        // zero the total cart price
        this._carts.totalCartPrice = 0
      },
      (err: ResponseInterface) => {
        err.status === 401 ? this._r.navigateByUrl('main/admin') : this._r.navigateByUrl('welcome/login')
      }
    )
  }

  public OnSearched(searchTerm: string) {
    this._carts.Search = searchTerm;
  }

  public backToShop() {
    this._r.navigateByUrl('main/cart')
  }
}
