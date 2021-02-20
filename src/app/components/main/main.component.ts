import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    if (!this._user.user?.id){
      this._user.checkTokens().subscribe(
        (res:ResponseInterface)=>{
          this._user.user = res.user
          if (res.user.role ===2){
            this._carts.getOpenCartByUser().subscribe(
              (res:ResponseInterface)=>{
                this._carts.openCart = res.openCart[0]
              },
              (err: ResponseInterface)=>{
                this._r.navigateByUrl('welcome')
              }
            )
          }else{
            this._user.activeComponent = "admin"
          }
          
        },
        (err: ResponseInterface)=>{
          this._r.navigateByUrl('welcome')
        }
      )
    }

    this._carts.cartStatus = false
  }

}
