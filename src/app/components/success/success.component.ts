import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    public _r: Router,
    public _orders: OrdersService
  ) { }

  ngOnInit(): void {
  }

  public goToWelcome(){
    this._r.navigateByUrl('/welcome')
  }

}
