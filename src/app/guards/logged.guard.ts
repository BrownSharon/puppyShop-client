import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import ResponseInterface from '../interfaces/response.interface';
import { CartsService } from '../services/carts.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanActivateChild {

  constructor(
    public _user: UserService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._user.user?.id) {
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.isLogin && this._user.user.role === 2) {
            return true
          } else {
            if (!this._user.user.isLogin){
              this._user.activeComponent = ""
              this._r.navigateByUrl('welcome/login')
            }
            if (this._user.user.role !== 1){
              this._user.activeComponent = "admin"
              this._r.navigateByUrl('main/admin')
            }
            return false
          }
        },
        (err: ResponseInterface) => {
          this._user.activeComponent = ""
          this._r.navigateByUrl('welcome/login')
          return false
        }
      )
    } else {
      if (this._user.user.isLogin && this._user.user.role === 2) {
        return true
      } else {
        if (!this._user.user.isLogin){
          this._user.activeComponent = ""
          this._r.navigateByUrl('welcome/login')
        }
        if (this._user.user.role !== 1){
          this._user.activeComponent = "admin"
          this._r.navigateByUrl('main/admin')
        }
        return false
      }
    }
  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._user.user.isLogin) {
      console.log(this._user.user);
      
      return true
    } else {
      this._r.navigateByUrl('welcome/login')
      
      return false
    }
  }

}
