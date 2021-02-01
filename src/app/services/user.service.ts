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
  public activeComponent: string = "login";
  public register1Data: any = {}
  public citiesArr: CityInterface[] = []
  
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

  public emailCheckUp(value:any) {
    return this.http.get(`http://localhost:10778/users/email/${value}`)
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

  public logout(body:object){
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

  public idCheckUp(id:number) {
    return this.http.get(`http://localhost:10778/users/id/${id}`)
  }

  public getCities(){
    return this.http.get(`http://localhost:10778/users`)
  }

}
