import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import *  as fileServer from 'file-saver'

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  public fileName: string = ""

  constructor(
    public _r: Router,
    public _user: UserService,
    public _orders: OrdersService,
    public _carts: CartsService,
  ) { }

  ngOnInit(): void {
    
    if (!this._user.user?.id) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          this._user.checkTokens().subscribe(
            (res: ResponseInterface) => {
              this._user.user = res.user
              if (this._user.user.role === 2) {
                this._orders.lastOrderByUser().subscribe(
                  (res: ResponseInterface) => {
                    this._orders.currentOrder = res.lastOrder[0]
                  },
                  (err: ResponseInterface) => {
                    this._r.navigateByUrl('welcome/login')
                  }
                )
              } else {
                // sessionStorage.activeComponent = "admin"
                // this._user.activeComponent = "admin"
                this._r.navigateByUrl('main/admin')
              }
            },
            (err: ResponseInterface) => {
              this._r.navigateByUrl('welcome/login')
            }
          )
        },
        (err: ResponseInterface) => {
          this._r.navigateByUrl('welcome/login')
        })
    }else{
      if (this._user.user.role === 2) {
        this._orders.lastOrderByUser().subscribe(
          (res: ResponseInterface) => {
            this._orders.currentOrder = res.lastOrder[0]
          },
          (err: ResponseInterface) => {
            this._r.navigateByUrl('welcome/login')
          }
        )
      } else {
        sessionStorage.activeComponent = "admin"
        this._user.activeComponent = "admin"
        this._r.navigateByUrl('main/admin')
      }
    }
  }
    downloadFile() {

      this._orders.getReceipt(this._orders.currentOrder.id, `receipt${this._orders.currentOrder.id}.pdf`).subscribe(
        (res: any) => {
          console.log(res);
          fileServer.saveAs(new Blob([res], { type: 'text/csv' }), `receipt${this._orders.currentOrder.id}.pdf`)
        },
        (err: ResponseInterface) => {
          this._r.navigateByUrl('welcome/login')
        }
      )

    }

  public goToWelcome() {
    this._r.navigateByUrl('welcome/welcome-msg')
  }

}
