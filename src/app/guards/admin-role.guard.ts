import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import ResponseInterface from '../interfaces/response.interface';
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
      this._user.checkTokens().subscribe(
        (res: ResponseInterface) => {
          this._user.user = res.user
          if (this._user.user.role == 2) {
            this._user.activeComponent = ""
            this._r.navigateByUrl('main/user')
            return false;
          } else {
            this._user.activeComponent = "admin"
            this._r.navigateByUrl('main/admin')
            return true
          }
        },
        (err: ResponseInterface) => {
          this._r.navigateByUrl('welcome/login')
          return false
        }
      )
    } else {
      if (this._user.user.role == 2) {
        this._user.activeComponent = ""
        this._r.navigateByUrl('main/user')
        return false;
      } else {
        this._user.activeComponent = "admin"
        this._r.navigateByUrl('main/admin')
        return true
      }
    }
  }


}
