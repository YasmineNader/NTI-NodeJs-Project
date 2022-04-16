import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  getsession:any
  constructor(private _userdata:UserService,private _router:Router) {
    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
   }

  ngOnInit(): void {
  }
logOutUser(){
  this._userdata.logOut().subscribe(res=>{
    localStorage.removeItem('token')
    // this._router.navigate(['/home'])
    sessionStorage.clear();
    sessionStorage.removeItem("User")
    this._router.navigate(['/loginUser'])
    window.location.reload()

  })
}
removeUserAccount(){
  this._userdata.userDeleteHimself().subscribe(res=>{
    console.log(res)
    this._router.navigate(["/userRegister"])
    window.location.reload()

  })
}
}
