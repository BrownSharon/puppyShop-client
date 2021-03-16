import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveSiteService } from './services/responsive-site.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  
  constructor(
    public _r: Router,
    public _location: Location,
    private _responsive:ResponsiveSiteService
  ) { }

  refresh(): void{
    this._r.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this._location.path()
      this._r.navigate([decodeURI(this._location.path())])
    })
  }

  ngOnInit(){
    
    this.onResize();    
  }

  onResize(){
    this._responsive.checkWidth();
    this._responsive.screenWidth === 'sm' ||  this._responsive.screenWidth === 'md'? this._responsive.isMobileRes = true : this._responsive.isMobileRes = false
  }

}
