import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from 'src/app/interfaces/cart.interface';
import UserInterface from 'src/app/interfaces/user.interface';
import OrderInterface from 'src/app/interfaces/order.interface';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string = "Guest"
  
  constructor(
    public _user: UserService,
    public _carts: CartsService,
    public _order: OrdersService,
    public _r: Router
  ) { }

  ngOnInit(): void {
  }

  public logOutUser() {
     
    const body = {}
    this._user.logout(body).subscribe(
      (res: ResponseInterface) => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        this._user.user = {} as UserInterface
        this._carts.openCart = {} as CartInterface
        this._order.lastOrder= {} as OrderInterface

        this._user.activeComponent = "login"
        this._r.navigateByUrl('/welcome')
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }
}
