import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from 'src/app/interfaces/cart.interface';
import CartItemInterface from 'src/app/interfaces/cartItem.interface';
import OrderInterface from 'src/app/interfaces/order.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    public _r: Router,
    public _orders: OrdersService,
    public _carts: CartsService
  ) { }

  ngOnInit(): void {
  }

  public goToWelcome(){
    this._carts.openCart = {} as CartInterface
    this._carts.totalCartPrice = 0
    this._orders.lastOrder = {} as OrderInterface
    this._r.navigateByUrl('/welcome')
  }

}
