import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivateChild {
  constructor(
    public _user: UserService,
    public _r: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._user.user?.id) {
      this._user.user = this._user.decodeToken(localStorage.token, localStorage.refreshToken)
    }
    if (this._user.user?.role === 2) {
      this._user.activeComponent = "welcome"
      this._r.navigateByUrl('welcome/welcome-msg')
      return false;
    } else {
      return true
    }
  }
}
