import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  getsession:any

  constructor() {
    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
     console.log(this.getsession)
   
   }

  ngOnInit(): void {
  }

}
