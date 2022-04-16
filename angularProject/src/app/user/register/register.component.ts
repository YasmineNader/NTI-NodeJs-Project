import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSubmitted : boolean= false
  msg : any = null
  uservalues =new FormGroup({
  name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
  email:new FormControl('',[Validators.email,Validators.required]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.minLength(11),Validators.maxLength(11)])
  })
  constructor(private _userdata:UserService,private route:Router) { }

  ngOnInit(): void {
  }

  userResult:any={}
  handleRegisterUser(){
    this.isSubmitted=true

    let userdata:User=this.uservalues.value
if(this.uservalues.valid){
    this._userdata.userRegister(userdata).subscribe(res=>{
      this.userResult=res
    },(error)=>{
        
        this.msg=error.error
     

    },()=>{
      if(this.userResult){
        this.msg=this.userResult
        this.route.navigateByUrl("/loginUser")

      }
    })
  }
}
  get name(){ return this.uservalues.get('name')}
  get email(){ return this.uservalues.get('email')}
  get phone(){ return this.uservalues.get('phone')}
  get password(){ return this.uservalues.get('password')}
}


