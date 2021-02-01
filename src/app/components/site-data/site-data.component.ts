import { Component, OnInit } from '@angular/core';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-site-data',
  templateUrl: './site-data.component.html',
  styleUrls: ['./site-data.component.css']
})
export class SiteDataComponent implements OnInit {

  constructor(
    public _orders: OrdersService,
    public _products: ProductsService

  ) { }

  ngOnInit(): void {
    this._orders.getCountOrders().subscribe(
      (res:ResponseInterface)=>{
        this._orders.ordersCounter = res.numberOfOrders[0].numberOfOrders
      },
      (err:ResponseInterface)=>{
        console.log(err);
      }
    )

    this._products.totalProductsCount().subscribe(
      (res:ResponseInterface)=>{
        this._products.productsCounter = res.productsCount[0].productsCount
      },
      (err:ResponseInterface)=>{
        console.log(err);
      }
    )
  }

}
