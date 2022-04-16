import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  singleData:any
  isSubmitted:boolean=false
  editOrder= new FormGroup({
     name:new FormControl(),
     price:new FormControl('',Validators.pattern("^[0-9]+$")),
     category:new FormControl(),
     quantity:new FormControl('',Validators.pattern("^[0-9]+$")),
     color:new FormControl(), 
    //  image:new FormControl(),


  })
  constructor(private _user:UserService,private activate:ActivatedRoute,private route:Router) {
     this.singleOrder()

    

   }
  ngOnInit(): void {
   
  }
  formValues(){
    this.editOrder.get('name')?.setValue(this.singleData.name);
    this.editOrder.get('price')?.setValue(this.singleData.price);

    this.editOrder.get('category')?.setValue(this.singleData.category);

    this.editOrder.get('quantity')?.setValue(this.singleData.quantity);

    this.editOrder.get('color')?.setValue(this.singleData.color);

  }
  singleOrder(){
    let OrderID = this.activate.snapshot.paramMap.get('orderId')
    this._user.UserSingleOrder(OrderID).subscribe(res=>{
      console.log(res.products[0]);
      this.singleData=res.products[0];
      this.formValues();
      
    })
    
    }

    // changePhoto(event:any){
    //   this.file=event.target.files
    //   console.log(event.target.files)
    // }
    // uploadPhoto(){
    //   let productID=this.activate.snapshot.paramMap.get('productID')
    //   const sendimage =new FormData()
    //   sendimage.append('profile',this.file[0])
  
    //   this._admin.editphoto(sendimage,productID).subscribe(res=>{
    //     console.log(res)
    //   })
    // }

  EditOrder(){
  this.isSubmitted=true
  let OrderID = this.activate.snapshot.paramMap.get('orderId')
  console.log(OrderID)
  this._user.UserEditOrder(OrderID,this.editOrder.value).subscribe(res=>{
    console.log(this.editOrder.value)
    console.log(res)
    this.route.navigateByUrl('User/cart')

  })
}
get name() {return this.editOrder.get('name')}
get price(){return this.editOrder.get('price')}
get category(){return this.editOrder.get('category')}
get quantity(){return this.editOrder.get('quantity')}
get color(){return this.editOrder.get('color')}


 

}
