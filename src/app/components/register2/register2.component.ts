import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {

  public register2Form: FormGroup

  constructor(
    public _user: UserService,
    public _r: Router,
    public _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this._user.register1Data){
      this._user.register1Data = JSON.parse(sessionStorage.register1Data)
    }
    if (this._r.url == '/welcome/register2') this._user.activeComponent = 'register2'

    this.register2Form = this._fb.group({
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
    })

    this._user.getCities().subscribe(
      (res: ResponseInterface) => {
        this._user.citiesArr = res.cities
      },
      (err: ResponseInterface) => {
        console.log(err);
        
      }
    )
  }

  public handleSubmit() {

    const { city, street, first_name, last_name } = this.register2Form.value
    
    const { israeliID, email, password } = this._user.register1Data
    const body = { israeliID, email, password, city, street, first_name, last_name }

    this._user.registerStep2(body).subscribe(
      (res: ResponseInterface) => {

        // set the token in the local storage
        localStorage.token = res.token 
        localStorage.refreshToken = res.refreshToken
        
        // set the loggedUser object in the user service
        this._user.user = this._user.decodeToken(res.token as string)
        
        // move to welcome component
        sessionStorage.removeItem("register1Data")
        // sessionStorage.removeItem("activeComponent")
        this._user.activeComponent="welcome"
        this._r.navigateByUrl('welcome/welcome-msg')
      },
      (err: ResponseInterface) => {
      }
    )
  }
}
