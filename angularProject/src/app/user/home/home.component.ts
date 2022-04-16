import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
watchesData:any=""
  constructor(private _user:UserService) { 
    this.homePage()
  }

  ngOnInit(): void {
  }
homePage(){

this._user.alldata().subscribe(res=>{
  this.watchesData=res
  // console.log(res)
 // console.log(res.error)

})
}
}
