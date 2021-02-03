import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { CartsService } from 'src/app/services/carts.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string = "Guest"
  
  constructor(
    public _user: UserService,
    public _r: Router
  ) { }

  ngOnInit(): void {
  }

  public logOutUser() {
     
    const body = {}
    this._user.logout(body).subscribe(
      (res: ResponseInterface) => {
        localStorage.token = ""
        localStorage.refreshToken = ""
        this._user.user = { isLogin: false }
        this._user.activeComponent = "login"
        this._r.navigateByUrl('/welcome')
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('/welcome')
      }
    )
  }
}
