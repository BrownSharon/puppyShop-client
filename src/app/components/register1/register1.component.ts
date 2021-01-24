import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  public idError: string = ""
  public emailError: string = ""
  public statusSubmit: boolean
  
  constructor(
    public _user: UserService,
    public _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.register1Form = this._fb.group({
      israeliID: [this._user.idValue, [Validators.required, Validators.minLength(9), Validators.maxLength(9), israeliIdValidator]],
      email: [this._user.emailValue, [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ["", [Validators.required]],
    },{
      validator: passwordMatchValidator
    })
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.register1Form.get('password'); }
  get passwordConfirm() { return this.register1Form.get('passwordConfirm'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.register1Form.hasError('passwordMismatch'))
      this.passwordConfirm.setErrors([{'passwordMismatch': true}]);
    else
      this.passwordConfirm.setErrors(null);
  }


  public handleSubmit() {
    this.idError = ""
    this.emailError = ""
    const { israeliID, email, password } = this.register1Form.value

    this._user.idCheckUp(israeliID).subscribe(
      (res: ResponseInterface) => {
        if (!res?.exists) {
          this.statusSubmit = true
        }
      },
      (err: ResponseInterface) => {
        this.idError = err.error
        this.statusSubmit = false
      }
    )

    this._user.emailCheckUp(email).subscribe(
      (res: ResponseInterface) => {
        if (!res?.exists) {
          this.statusSubmit = true
        }
      },
      (err: ResponseInterface) => {
        this.emailError = err.error
        this.statusSubmit = false
      }
    )

    if (this.statusSubmit) {
      this._user.register1Data = { israeliID, email, password }
      console.log(this._user.register1Data);
      // move to step 2 component
      this._user.activeComponent = "register2"
    }


  }


}
