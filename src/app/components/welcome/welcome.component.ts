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
    this._user.activeComponent = ""
    if (!this._user.user?.id) {
      this._user.user = this._user.decodeToken(localStorage.token, localStorage.refreshToken)
    }
    console.log(this._user.user);
    
    if (this._user.user?.isLogin) {
      // move to welcome component for regular user
      if (this._user.user.role === 2) {
        this._r.navigateByUrl('welcome/welcome-msg')
      } else {
        // move to main page with admin product form component
        this._r.navigateByUrl('main/admin')
      }
    }else{
      this._user.activeComponent = sessionStorage.activeComponent
      if (this._user.activeComponent==='register1') this._r.navigateByUrl('welcome/register1')
      if (this._user.activeComponent==='register2') this._r.navigateByUrl('welcome/register2')
    }
    
  }

  ngDoCheck(){
    if (this._r.url == '/welcome/welcome-msg') this._user.activeComponent = 'welcome'
    if (this._r.url == '/welcome/register1') this._user.activeComponent = 'register1'
    if (this._r.url == '/welcome/register2') this._user.activeComponent = 'register2'
    if (this._r.url == '/welcome/login') this._user.activeComponent = ''
  }

}
