import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public serverError: string = ""

  constructor(
    public _user: UserService,
    public _fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
    this.serverError = ""
    const { israeliID, email, password } = this.register1Form.value

    this._user.registerStep1(israeliID, email).subscribe(
      (res: ResponseInterface) => {
        if (!res?.exists) {
          this._user.register1Data = { israeliID, email, password }
          this._user.activeComponent = "register2"
        }
      },
      (err: ResponseInterface) => {
        this.serverError = err.error
      }
    )
  }
}
