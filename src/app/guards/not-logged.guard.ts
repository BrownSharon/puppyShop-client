import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import ResponseInterface from '../interfaces/response.interface';
import { CartsService } from '../services/carts.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivateChild {
  constructor(
    public _user: UserService,
    public _carts: CartsService,
    public _r: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._user.user?.id) {

      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.isLogin === false) {
            return true
          } else {
            this._user.activeComponent = "welcome"
            this._r.navigateByUrl('welcome/welcome-msg')
            return false
          }
        },
        (err: ResponseInterface) => {
          if (!this._user.user.isLogin) {
            return true
          }
        }
      )
    } else {
      if (!this._user.user.isLogin) {
        return true
      } else {
        this._user.activeComponent = "welcome"
        this._r.navigateByUrl("welcome/welcome-msg")
        return false
      }
    }
  }
}
