import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {
  getsession:any
  productData:any
  orderForm=new FormGroup({
name:new FormControl(),
price:new FormControl(),
category:new FormControl(),
quantity:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
color:new FormControl("",[Validators.required,Validators.pattern("^[A-z]+$")])

  })
  constructor(private _user:UserService,private active:ActivatedRoute ) { 
    this.getsession = JSON.parse(sessionStorage.getItem("User")||'{}');
    //this.userorders()
    this.detailsOfOrder()

  }
formValues(){
  this.orderForm.get('name')?.setValue(this.productData.name)
  this.orderForm.get('price')?.setValue(this.productData.price)
  this.orderForm.get('category')?.setValue(this.productData.category)

}
  ngOnInit(): void {
  }
  

  detailsOfOrder(){
     let productId=this.active.snapshot.paramMap.get("productID")
    
    this._user.orderDetails(productId).subscribe(res=>{
        //  console.log(res.productData)
         this.productData=res.productData
         this.formValues()


    })
  }

  userorders(){
    let orderData=this.orderForm.value
    let productID=this.active.snapshot.paramMap.get("productID")
   
    this._user.addOrder(this.getsession.ID,productID,orderData).subscribe(res=>{
    //  console.log(this.getsession.ID)ذ
    // console.log(orderData)
    console.log(res)
    })
  }
get name(){return this.orderForm.get("name")}
get price(){return this.orderForm.get("price")}
get category(){return this.orderForm.get("category")}
get quantity(){return this.orderForm.get("quantity")}
get color(){return this.orderForm.get("color")}

}
