import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-msg-welcome',
  templateUrl: './msg-welcome.component.html',
  styleUrls: ['./msg-welcome.component.css']
})
export class MsgWelcomeComponent implements OnInit {


  constructor(
    public _user: UserService,
    public _carts: CartsService,
    public _orders: OrdersService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    if (this._user.user?.isLogin) {
      if (this._user.user?.role === 2) {
        this._carts.getOpenCartByUser().subscribe(
          (res: ResponseInterface) => {
            if (res.cart) {
              this._carts.openCart = res.cart
              this._carts.totalPrice(this._carts.openCart.id).subscribe(
                (res: ResponseInterface) => {
                  this._carts.totalCartPrice = res.totalCartPrice
                },
                (err: ResponseInterface) => {
                  this._user.activeComponent = ""
                  this._r.navigateByUrl('welcome/login')
                })
            } else {
              this._orders.lastOrderByUser().subscribe(
                (res: ResponseInterface) => {
                  if (res.order) {
                    this._orders.lastOrder = res.order
                  }
                },
                (err: ResponseInterface) => {
                })
            }
          },
          (err: ResponseInterface) => {
            this._user.activeComponent = ""
            this._r.navigateByUrl('welcome/login')
          })
      } else {
        this._r.navigateByUrl('main/admin')
      }
    }else{
      this._r.navigateByUrl('welcome/login')
    }
  }
  public startShopping() {
    this._carts.getNewCart().subscribe(
      (res: ResponseInterface) => {
        this._user.activeComponent = ""
        sessionStorage.removeItem('activeComponent')
        this._carts.openCart = res.cart
        this._r.navigateByUrl('main/cart')
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('welcome/login')
      }
    )
  }

  public continueShopping() {
    this._user.activeComponent = ""
    sessionStorage.removeItem('activeComponent')
    this._r.navigateByUrl('main/cart')
  }

}
