import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveSiteService {

  private isMobile = new Subject();
  public screenWidth: string;
  public isMobileRes: boolean

  constructor() {
    this.checkWidth();
  }

  onMobileChange(status: boolean) {
    this.isMobile.next(status);
  }

  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  public checkWidth() {
    const width = window.innerWidth;
    if (width <= 640) {
      this.screenWidth = 'sm';
      this.onMobileChange(true);
    } else if (width >= 641 && width <= 1007) {
      this.screenWidth = 'md';
      this.onMobileChange(true);

    } else {
      this.screenWidth = 'lg';
      this.onMobileChange(false);

    }
  }

}
