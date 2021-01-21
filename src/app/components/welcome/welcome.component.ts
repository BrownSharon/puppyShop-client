import { Component, OnInit, ViewContainerRef, Directive, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  @Input() public ngSwitch: any

  constructor(
    public _user: UserService
  ) { }

  ngOnInit(): void {
  }

  

}
