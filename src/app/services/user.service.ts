import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import ResponseInterface from '../interfaces/response.interface';
import TokenInterface from '../interfaces/token.interface';
import UserInterface from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // state
  public user: UserInterface = { isLogin: false }
  public activeComponent: string = "login";
  
  constructor(
    private http: HttpClient,
    public _r: Router
  ) { }

  // server
  public register(body: object) {
    return this.http.post('http://localhost:10778/users', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public login(body: object) {
    return this.http.post('http://localhost:10778/users/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public dataUserCheckUp() {
    return this.http.get('http://localhost:10778/users')
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

  public logout() {
    this.http.patch('http://localhost:10778/users', {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token,
        'refreshToken': localStorage.refreshToken
      }
    }).subscribe(
      (res: any) => {
        localStorage.token = ""
        localStorage.refreshToken = ""
        this.user = { isLogin: false }
        this._r.navigateByUrl('/welcome')
      },
      (err: ResponseInterface) => {
          console.log(err);
          
      }
    )
  }

  public decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (err) {
      return null;
    }
  }

}
