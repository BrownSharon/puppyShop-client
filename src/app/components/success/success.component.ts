import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from 'src/app/interfaces/cart.interface';
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
    if (!this._user.user?.id){
      this._user.checkTokens().subscribe(
        (res:ResponseInterface)=>{
          this._user.user = res.user
          this._orders.lastOrderByUser().subscribe(
            (res:ResponseInterface)=>{
              this._orders.currentOrder = res.lastOrder[0]
            },
            (err: ResponseInterface)=>{
              this._r.navigateByUrl('welcome')
            }
          )
        },
        (err: ResponseInterface)=>{
          this._r.navigateByUrl('welcome')
        }
      )
    }
  }

  downloadFile() {

    this._orders.getReceipt(this._orders.currentOrder.id, `receipt${this._orders.currentOrder.id}.pdf`).subscribe(
      (res: any)=>{
        fileServer.saveAs(new Blob([res], {type: 'text/csv'}), `receipt${this._orders.currentOrder.id}.pdf`)
      },
      (err: ResponseInterface)=>{
        console.log(err);  
      }
    )
  
  }
  
  public goToWelcome(){

    this._r.navigateByUrl('/welcome')
  }

}
