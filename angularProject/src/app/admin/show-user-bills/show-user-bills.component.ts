import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-user-bills',
  templateUrl: './show-user-bills.component.html',
  styleUrls: ['./show-user-bills.component.css']
})
export class ShowUserBillsComponent implements OnInit {
  constructor(private _admin:AdminService) {
    this.UserOrderBills()
   }
billsData:any

  ngOnInit(): void {
  }
  UserOrderBills(){
    this._admin.userBills().subscribe(res=>{
      console.log(res)
      this.billsData=res


    })
  }
  delivered(billid:any){
    // console.log(orderstatus)
    this._admin.changeBillStatus(billid).subscribe(res=>{
      console.log(res)
    })
    // orderstatus="delivered"


  }

  cancelled(billid:any){
    this._admin.cancelBill(billid).subscribe(res=>{
      console.log(res)
    })
  }
}
