import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserType:any
  Name:any
  isSubmitted : boolean= false
  adminLoginValues =new FormGroup({
    password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.email,Validators.required])
  })
  constructor(private _adminlogin:AdminService,private _route:Router) { }
   

    
  ngOnInit(): void {
  }
  msg:any
  adminLoginResult:any={}
  handleLoginAdmin(){
    
    let data:any = this.adminLoginValues.value
    if(this.adminLoginValues.valid){
    this._adminlogin.adminLogin(data).subscribe(res=>{
    this.adminLoginResult = res
    this.UserType=this.adminLoginResult.UserType
    this.Name=this.adminLoginResult.Name
    let admin = {"type":this.UserType,"Name":this.Name}
      //console.log(this.adminLoginResult.UserType)
     //let admin = {'type': this.UserType,"Name":this.adminLoginResult.Name}
    sessionStorage.setItem('User', JSON.stringify(admin));
    // sessionStorage.setItem('User',JSON.stringify(admin));

    // console.log(this.UserType)
    console.log(this.adminLoginResult.message)

},
()=>{

  this.msg={"Message":"Please Enter Your credentials Again"}

},
()=>{
    
        let adminToken = this.adminLoginResult.token
        // console.log(adminToken)
        localStorage.setItem('adminToken',adminToken)
        this._route.navigate(['/Admin/Home'])

      
})
      }

}
  get email(){return this.adminLoginValues.get('email')}

  get password(){return this.adminLoginValues.get('password')}

  
}
