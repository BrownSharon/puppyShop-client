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
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.role === 2) {
            this._carts.getOpenCartByUser().subscribe(
              (res: ResponseInterface) => {
                this._carts.openCart = res.cart
              },
              (err: ResponseInterface) => {
                console.log(err.error);
                console.log("test");
                this._r.navigateByUrl('welcome/login')
              }
            )
          } else {
            this._user.activeComponent = "admin"
            this._r.navigateByUrl('main/admin')
          }
        },
        (err: ResponseInterface) => {
          console.log(err.error);
          console.log("test");
          this._r.navigateByUrl('welcome/login')
        })
      this._carts.cartStatus = false
    } else {
      if (this._user.user.role === 2) {
      this._user.activeComponent = "user"
        this._carts.getOpenCartByUser().subscribe(
          (res: ResponseInterface) => {
            this._carts.openCart = res.cart
          },
          (err: ResponseInterface) => {
            console.log(err.error);
            console.log("test");
            this._r.navigateByUrl('welcome/login')
          }
        )
      } else {
        this._user.activeComponent = "admin"
        this._r.navigateByUrl('main/admin')
      }
    }
  }

  
}
