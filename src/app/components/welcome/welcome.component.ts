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
    if (localStorage.token) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          if (!res.err && this._user.user.isLogin) {
            // move to welcome component for regular user
            if (this._user.user.role === 2) {
              this._user.activeComponent = "welcome"
            } else {
              // move to main page with admin product form component
              this._user.activeComponent = "admin"
              this._r.navigateByUrl('/main')
            }
          }
        },
        (err: ResponseInterface) => {
          this._user.activeComponent = "login"
        }
      )
    } else {
      this._user.activeComponent = "login"
    }
  }



}
