import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {
    isSubmitted : boolean= false
    adminvalues =new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.email,Validators.required])
  })
  

  constructor(private _admindata:AdminService,private route:Router) {

  
   }

  ngOnInit(): void {
  }
  adminResult:any={}
  handleRegisterAdmin(){
    let admindata:Admin=this.adminvalues.value

    this._admindata.adminRegister(admindata).subscribe(res=>{
  
      this.adminResult=res
      this.route.navigateByUrl("/loginAdmin")

    })
  }
  get name(){ return this.adminvalues.get('name')}
  get email(){ return this.adminvalues.get('email')}
  get password(){ return this.adminvalues.get('password')}
}
