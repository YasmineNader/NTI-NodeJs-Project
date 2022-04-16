import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  productId:any
  getsession:any
orders:any
  constructor(private _user:UserService,private route:Router) {   
    
   this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');


    // this.userCart()
    this.userOrders()
  }

  ngOnInit(): void {
  }
  userOrders(){

    this._user.AllUserOrders(this.getsession.ID).subscribe(res=>{
      this.orders=res

      console.log(res)
    })
  }

 
  deleteOrder(orderId:any){
               
    this._user.UserDeleteOrder(orderId).subscribe(res=>{
      console.log(res)
     
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate(['User/cart']);
    })

  }
  // userCart(){

  //   this._user.orderDetails(this.productId).subscribe(res=>{
  //     console.log(res)
  //   })
  // }
}
