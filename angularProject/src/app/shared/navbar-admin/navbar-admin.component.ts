import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  getsession:any
  constructor(private _admin:AdminService,private _router:Router) {
    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');

   }

  ngOnInit(): void {
  }
  logOutAdmin(){
  this._admin.logOut().subscribe(res=>{
  localStorage.removeItem("adminToken")
  sessionStorage.clear();
  sessionStorage.removeItem("User")
  this._router.navigate(['/loginAdmin'])
  window.location.reload()

  console.log(res)
})
  }
}
