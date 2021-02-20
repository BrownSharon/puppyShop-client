import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { OrdersService } from 'src/app/services/orders.service';
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
    if (!this._user.user?.id) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.isLogin === true) {
            // move to welcome component for regular user
            if (this._user.user.role === 2) {
              this._user.activeComponent = "welcome"
            } else {
              // move to main page with admin product form component
              this._user.activeComponent = "admin"
              this._r.navigateByUrl('/main')
            }
          }else{
            sessionStorage.activeComponent? this._user.activeComponent = sessionStorage.activeComponent : this._user.activeComponent = "login"
          }
        },
        (err: ResponseInterface) => {
          sessionStorage.activeComponent? this._user.activeComponent = sessionStorage.activeComponent : this._user.activeComponent = "login"
        }
      )
    } else {
      if (this._user.user.isLogin === true) {
        // move to welcome component for regular user
        if (this._user.user.role === 2) {
          this._user.activeComponent = "welcome"
        } else {
          // move to main page with admin product form component
          this._user.activeComponent = "admin"
          this._r.navigateByUrl('/main')
        }
      }else{
        sessionStorage.activeComponent? this._user.activeComponent = sessionStorage.activeComponent : this._user.activeComponent = "login"
      }
    }
  }
}
