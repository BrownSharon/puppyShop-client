import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  
  constructor(
    public _r: Router,
    public _location: Location
  ) { }

  refresh(): void{
    this._r.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this._location.path()
      this._r.navigate([decodeURI(this._location.path())])
    })
  }
}
