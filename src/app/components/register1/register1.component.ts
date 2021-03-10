import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/services/user.service';
import israeliIdValidator from 'src/app/validators/israeliid.validator';
import passwordMatchValidator from 'src/app/validators/matchPassword.validator';


@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component implements OnInit {

  public register1Form: FormGroup
  
  constructor(
    public _user: UserService,
    public _r: Router,
    public _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this._user.activeComponent= sessionStorage.activeComponent
    if (this._r.url == '/welcome/register1') this._user.activeComponent = 'register1'
    
    this.register1Form = this._fb.group({
      israeliID: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9), israeliIdValidator]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ["", [Validators.required]],
    }, {
      validator: passwordMatchValidator
    })
    
    
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.register1Form.get('password'); }
  get passwordConfirm() { return this.register1Form.get('passwordConfirm'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.register1Form.hasError('passwordMismatch'))
      this.passwordConfirm.setErrors([{ 'passwordMismatch': true }]);
    else
      this.passwordConfirm.setErrors(null);
  }

  public handleSubmit() {
    
    const { israeliID, email, password } = this.register1Form.value
    const body = {israeliID, email, dryRun:true}
    this._user.register(body).subscribe(
      (res: ResponseInterface) => {
        if (!res?.exists) {
          this._user.register1Data = { israeliID, email, password }
          sessionStorage.register1Data = JSON.stringify(this._user.register1Data)
          this._user.activeComponent = "register2"
          this._r.navigateByUrl('welcome/register2')
        }
      },
      (err: ResponseInterface) => {
        this._user.isServerError = true
        this._user.serverErrorMsg = err.error.msg
      }
    )
  }
}
