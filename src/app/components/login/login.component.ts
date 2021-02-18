import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup


  constructor(
    public _user: UserService,
    public _fb: FormBuilder,
    public _r: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    })
  }

  public handleSubmit() {

    this._user.login(this.loginForm.value).subscribe(
      (res: ResponseInterface) => {

        // set the token in the local storage
        localStorage.token = res.token 
        localStorage.refreshToken = res.refreshToken
        
        // set the loggedUser object in the user service
        this._user.user = this._user.decodeToken(res.token as string)
        this._user.username = this._user.user.first_name
        
        // move to welcome component for regular user
        if (this._user.user.role === 2){
          this._user.activeComponent="welcome"
        }else{
          // move to main page with admin product form component
          this._user.activeComponent = "admin"
          this._r.navigateByUrl('/main')
        }

      },
      (err: ResponseInterface) => {
        console.log(err);

      }
    )
  }

  public goToRegistration(){
    this._user.activeComponent="register1"
  }
}
