import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import CityInterface from '../interfaces/city.interface';
import UserInterface from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public path: string = 'http://localhost:10778/'

  public user: UserInterface = { isLogin: false }
  public username: string = "Guest"
  public activeComponent: string = "";
  public register1Data: any
  public citiesArr: CityInterface[] = []
  public serverErrorMsg: string
  public isServerError: boolean = false

  constructor(
    private http: HttpClient,
    public _r: Router,
    private _sb: MatSnackBar
  ) { }

  public register(body: object) {
    return this.http.post(`${this.path}users`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public login(body: object) {
    return this.http.post(`${this.path}users/login`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public logout(body: object) {
    return this.http.put(`${this.path}users/logout`, body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public getCities() {
    return this.http.get(`${this.path}users/cities`)
  }

  // front end functions
  public decodeToken(token: string, refreshToken: string): any {
    try {
      const decoded: any = jwt_decode(token)
      const decodedRefresh: any = jwt_decode(refreshToken)
      if (Date.now() / 1000 < decoded.exp) {
        return decoded;
      } else if (Date.now() / 1000 < decodedRefresh.exp) {
        return decodedRefresh
      } else {
        this.activeComponent = ""
      this.user = { isLogin: false }
      return { isLogin: false }
      }

    }
    catch (err) {    
      this.activeComponent = ""
      this.user = { isLogin: false }
      return { isLogin: false }
    }
  }

  public goToLogin() {
    sessionStorage.removeItem("activeComponent")
    if (sessionStorage.register1Data) sessionStorage.removeItem("register1Data")
    this.activeComponent = ""
    this._r.navigateByUrl('welcome/login')
  }

  public inputHasChanged() {
    this.isServerError = false
    this.serverErrorMsg = ""
  }

  public openSnackbar(msg) {
    this._sb.open(msg, "", {
      duration: 2500,
      verticalPosition: 'top'
    })
  }


}


