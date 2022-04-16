import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-bills',
  templateUrl: './user-bills.component.html',
  styleUrls: ['./user-bills.component.css']
})
export class UserBillsComponent implements OnInit {

  constructor(private _user:UserService) {
    this.UserOrderBills()
   }

  ngOnInit(): void {
  }

  UserOrderBills(){
    this._user.orderBills().subscribe(res=>{
      console.log(res)
    })
  }
}
