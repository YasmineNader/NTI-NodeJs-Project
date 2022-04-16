import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  UserType:any
  Name:any
  ID:any
  isSubmitted : boolean= false
  msg : any = null
  userLoginValues =new FormGroup({
    password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.email,Validators.required])
  })
  location: any;
  constructor(private _adminlogin:UserService , private _route:Router) { }

  ngOnInit(): void {
  }
  userLoginResult:any={}

  handleLoginUser(){

    this.isSubmitted=true
    let data:any = this.userLoginValues.value
if(this.userLoginValues.valid){
this._adminlogin.userLogin(data).subscribe(res=>{
 this.userLoginResult = res
 console.log(this.userLoginResult)
 this.UserType=this.userLoginResult.UserType
 this.Name=this.userLoginResult.name
 this.ID=this.userLoginResult.id
//  sessionStorage.setItem('UserType', this.UserType);
let User={"type":this.UserType,"Name":this.Name,"ID":this.ID}
// sessionStorage.setItem('User','{type:'+this.UserType+',Name:"Mona"}');
sessionStorage.setItem('User',JSON.stringify(User));


 console.log(this.UserType)
},
(error)=>{

  this.msg={"Message":"Please Enter Your credentials Again"}

},
()=>{
  // console.log('**************************************')
  // console.log(this.userLoginResult)
  // console.log('**************************************')
  // console.log('kkkkkkk')
        let token = this.userLoginResult.token
        localStorage.setItem('token',token)
        this._route.navigate(['/home'])
        .then(() => {
        window.location.reload();
  });
        // this._route.navigate(['/home'])
        // window.location.reload()


      
})
}
  }
  get email(){return this.userLoginValues.get('email')}

  get password(){return this.userLoginValues.get('password')}

  
}
