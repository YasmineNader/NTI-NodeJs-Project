import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-user-cart',
  templateUrl: './single-user-cart.component.html',
  styleUrls: ['./single-user-cart.component.css']
})
export class SingleUserCartComponent implements OnInit {
orderData:any
  constructor(private _user:UserService,private active:ActivatedRoute) { 
      this.singleOrder()
  }

  ngOnInit(): void {
  }

singleOrder(){
   let OrderID = this.active.snapshot.paramMap.get('orderId')
   this._user.UserSingleOrder(OrderID).subscribe(res=>{
     this.orderData=res.products
     console.log(this.orderData)

   })
}
}
