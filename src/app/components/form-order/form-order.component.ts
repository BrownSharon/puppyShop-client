import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {

  public orderForm: FormGroup

  public DatesToDisable: any[]
  
  constructor(
    public _user: UserService,
    public _carts: CartsService,
    public _orders: OrdersService,
    public _r: Router,
    public _fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.orderForm = this._fb.group({
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      shipping_date: ["", [Validators.required]],
      credit_card: ["", [Validators.required]],
    })

    this._user.getCities().subscribe(
      (res: ResponseInterface) => {
        this._user.citiesArr = res.cities
        this._orders.getDatesToDisable().subscribe(
          (res: ResponseInterface) => {
            this.DatesToDisable = res.filteredDates
          },
          (err: ResponseInterface) => {
            console.log(err);
            this._r.navigateByUrl('/welcome')
          }
        )
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
    

  }

  public handleSubmit() {
    // close the current cart
    const cartBody = { id: this._carts.openCart.id }
    this._carts.changeStatusCart(cartBody).subscribe(
      (res: ResponseInterface) => {
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')

      }
    )
    // open new order
    const closing_date = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const delivery_date = new Date(this.orderForm.value.shipping_date).toISOString().slice(0, -14)

    const orderBody = {
      user_id: this._user.user.id,
      cart_id: this._carts.openCart.id,
      order_total_price: this._carts.totalCartPrice,
      city: this.orderForm.value.city,
      street: this.orderForm.value.street,
      delivery_date: delivery_date,
      closing_date: closing_date,
      credit_card: this.orderForm.value.credit_card
    }

    this._orders.addOrder(orderBody).subscribe(
      (res: ResponseInterface) => {
        this._orders.lastOrder = res.newOrder
        this._r.navigateByUrl('/success')
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')

      }
    )

  }

  public fillCityValue() {
    console.log(this._user.user.city);
    this.orderForm.patchValue({ city: this._user.user.city })
  }

  public fillStreetValue() {
    this.orderForm.patchValue({ street: this._user.user.street })
  }

  public occupiedDates = (d: Date | null): boolean => {
    const date = (d || new Date()).getDate()
    return this.DatesToDisable?.findIndex(dataDate => new Date(dataDate.delivery_date).getDate()=== date) < 0;
  }
}
