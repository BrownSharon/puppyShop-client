import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor(
    public _carts: CartsService,
    public _user: UserService,
    public _r: Router,

  ) {

  }

  ngOnInit(): void {
    if (!this._user.user?.id) {
      this._user.user = this._user.decodeToken(localStorage.token, localStorage.refreshToken)
    }
    if (this._user.user === 2) {
      this._carts.getOpenCartByUser().subscribe(
        (res: ResponseInterface) => {
          this._carts.openCart = res.cart
        },
        (err: ResponseInterface) => {
          err.status === 401 ? this._r.navigateByUrl('main/admin') : this._r.navigateByUrl('welcome/login')
        }
      )
      this._carts.cartStatus = false
    }
  }

  ngDoCheck() {
    if (this._r.url == '/main/admin') this._user.activeComponent = 'admin'
    if (this._r.url == '/main/cart') this._user.activeComponent = ''
  }
}
