import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _carts: CartsService,
    public _orders: OrdersService,
    public _user: UserService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    if (!this._user.user?.id) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          this._carts.getOpenCartByUser().subscribe(
            (res: ResponseInterface) => {
              this._carts.openCart = res.openCart[0]
              this._carts.totalPrice(this._carts.openCart.id).subscribe(
                (res: ResponseInterface) => {
                  this._carts.totalCartPrice = res.totalCartPrice
                  this._carts.cartStatus = true
                },
                (err: ResponseInterface) => {
                  console.log(err);
                  this._r.navigateByUrl('welcome/login')
                })
            },
            (err: ResponseInterface) => {
              console.log(err);
              this._r.navigateByUrl('welcome/login')
            })
        },
        (err: ResponseInterface) => {
          this._user.activeComponent = ""
          this._r.navigateByUrl('welcome/login')
        })
    } else {
      this._carts.getOpenCartByUser().subscribe(
        (res: ResponseInterface) => {
          console.log(res.openCart);
          if (res.openCart.length > 0) {
            this._carts.openCart = res.openCart[0]
            this._carts.totalPrice(this._carts.openCart.id).subscribe(
              (res: ResponseInterface) => {
                this._carts.totalCartPrice = res.totalCartPrice
                this._carts.cartStatus = true
              },
              (err: ResponseInterface) => {
                console.log(err);
                this._r.navigateByUrl('welcome/login')
              })
          } else {
            this._r.navigateByUrl('welcome/login')
          }

        },
        (err: ResponseInterface) => {
          console.log(err);
          this._r.navigateByUrl('welcome/login')
        })
    }
  }
}

