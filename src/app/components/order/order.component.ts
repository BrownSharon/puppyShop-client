import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _carts: CartsService
  ) { }

  ngOnInit(): void {
    this._carts.cartStatus = true
  }

}
