import { Component, OnInit, Input } from '@angular/core';
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
    public _user: UserService

  ) { }

  ngOnInit(): void {
    if (localStorage.token){
      this._user.checkTokens().subscribe(
        (res:ResponseInterface)=>{
          if(!res.err && this._user.user.isLogin){
            this._user.activeComponent = "welcome"
          }  
        },
        (err:ResponseInterface)=>{
          this._user.activeComponent = "login"
        }
      )
    }else{
      this._user.activeComponent = "login"
    }
  }

  

}
