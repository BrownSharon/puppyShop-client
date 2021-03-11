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
    if (!this._user.user?.id) {
      this._user.user = this._user.decodeToken(localStorage.token, localStorage.refreshToken)
    }
    if (this._user.user?.isLogin) {
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
      this._user.activeComponent = ""
      this._r.navigateByUrl('welcome/login')
    }

  }

  ngDoCheck() {
    if (this._r.url == '/welcome/welcome-msg') this._user.activeComponent = 'welcome'
    if (this._r.url == '/welcome/register1') this._user.activeComponent = 'register1'
    if (this._r.url == '/welcome/register2') this._user.activeComponent = 'register2'
    if (this._r.url == '/welcome/login') this._user.activeComponent = ''
  }

}
