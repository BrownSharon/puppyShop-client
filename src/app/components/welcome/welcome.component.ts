import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  @Input() public ngSwitch: any

  public decodedToken: any

  constructor(
    public _user: UserService,
    public _r: Router

  ) { }

  ngOnInit(): void {
    if (sessionStorage.activeComponent) this._user.activeComponent = sessionStorage.activeComponent
    if (!this._user.user?.id) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.isLogin === true) {
            // move to welcome component for regular user
            if (this._user.user.role === 2) {
              this._user.activeComponent = "welcome"
              this._r.navigateByUrl('welcome/welcome-msg')
            } else {
              // move to main page with admin product form component
              this._user.activeComponent = "admin"
              this._r.navigateByUrl('main/admin')
            }
          } else {
            if (this._user.activeComponent === "register1") {
              this._r.navigateByUrl('welcome/register1')
            } else if (this._user.activeComponent === "register2") {
              this._r.navigateByUrl('welcome/register2')
            } else {
              this._r.navigateByUrl('welcome/login')
            }

          }
        },
        (err: ResponseInterface)=>{
          if (this._user.activeComponent === "register1") {
            this._r.navigateByUrl('welcome/register1')
          } else if (this._user.activeComponent === "register2") {
            this._r.navigateByUrl('welcome/register2')
          } else {
            this._r.navigateByUrl('welcome/login')
          }
        })

    }else{
      if (this._user.activeComponent === "register1") {
        this._r.navigateByUrl('welcome/register1')
      } else if (this._user.activeComponent === "register2") {
        this._r.navigateByUrl('welcome/register2')
      } else {
        this._r.navigateByUrl('welcome/login')
      }
    }
  }

}
