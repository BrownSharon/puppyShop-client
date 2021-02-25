import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import CityInterface from '../interfaces/city.interface';
import ResponseInterface from '../interfaces/response.interface';
import UserInterface from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // state
  public user: UserInterface = { isLogin: false }
  public username: string = "Guest"
  public activeComponent: string = "login";
  public register1Data: any
  public citiesArr: CityInterface[] = []

  constructor(
    private http: HttpClient,
    public _r: Router
  ) { }

  public registerStep1(id: number, email: string) {
    return this.http.get(`http://localhost:10778/users/${id}/${email}`)
  }

  public registerStep2(body: object) {
    return this.http.post('http://localhost:10778/users', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public login(body: object) {
    return this.http.post('http://localhost:10778/users/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public checkTokens() {
    return this.http.get('http://localhost:10778/users/check', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public logout(body: object) {
    return this.http.put('http://localhost:10778/users/logout', body, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    })
  }

  public decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (err) {
      return null;
    }
  }

  public getCities() {
    return this.http.get(`http://localhost:10778/users`)
  }

  public goToLogin(){
    sessionStorage.removeItem("activeComponent")
    if (sessionStorage.register1Data) sessionStorage.removeItem("register1Data") 
    this.activeComponent = ""
    this._r.navigateByUrl('welcome/login')
  }

  public checkUser() {
    if (localStorage.token) {
      this.checkTokens().subscribe(
        (res: ResponseInterface) => {
          if (!res.err) {
            this.user = res.user
            if (this.user.isLogin)
            // move to welcome component for regular user
            if (this.user.role === 2) {
              this.activeComponent = "welcome"
              localStorage.activeComponent = "welcome"
            } else {
              // move to main page with admin product form component
              this.activeComponent = "admin"
              localStorage.activeComponent = "admin"
              this._r.navigateByUrl('/main')
            }
          }
        },
        (err: ResponseInterface) => {
          if (localStorage.activeComponent && localStorage.activeComponent !== "welcome" || "admin") {
            this.activeComponent = localStorage.activeComponent
          } else {
            this.activeComponent = "login"
            localStorage.activeComponent = "login"
          }
        }
      )
    } else {
      if (localStorage.activeComponent && localStorage.activeComponent !== "welcome" || "admin") {
        this.activeComponent = localStorage.activeComponent
      } else {
        this.activeComponent = "login"
        localStorage.activeComponent = "login"
      }
    }
  }
}


