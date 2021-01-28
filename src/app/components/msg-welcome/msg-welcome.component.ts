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
    this._carts.getOpenCartByUser().subscribe(
      (res: ResponseInterface) => {
        this._carts.openCart = res.openCart[0]
        if (this._carts.openCart?.status == false) {
          this._carts.totalPrice(this._carts.openCart.id).subscribe(
            (res: ResponseInterface) => {
              this._carts.totalCartPrice = res.totalCartPrice
            },
            (err: ResponseInterface) => {
              console.log(err);
            })
        } else {
          this._orders.lastOrderByUser().subscribe(
            (res: ResponseInterface) => {
              if (res.lastOrder) {
                this._orders.lastOrder = res.lastOrder[0]
                console.log(this._orders.lastOrder);
              }
            },
            (err: ResponseInterface) => {
              console.log(err);
            })
        }
      },
      (err: ResponseInterface) => {
        console.log(err)
      })
  }

  public startShopping() {
    this._carts.getNewCart().subscribe(
      (res: ResponseInterface) => {
        console.log(res);
        this._carts.openCart = res.cart[0]
        this._r.navigateByUrl('/main')
      },
      (err: ResponseInterface) => {
        console.log(err);
        
      }
    )
  }

  public continueShopping(){
    this._r.navigateByUrl('/main')
  }



}
