import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public _carts: CartsService
  ) { }

  ngOnInit(): void {
    this._carts.cartStatus = false
  }

}
