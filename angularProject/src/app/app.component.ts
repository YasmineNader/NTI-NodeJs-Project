import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  getsession:any;
  constructor(){
   this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
  }

  title = 'angularProject';
}
