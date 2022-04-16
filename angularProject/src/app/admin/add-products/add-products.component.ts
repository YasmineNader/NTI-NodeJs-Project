import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  file!:FileList 

  isSubmitted:boolean=false
  addProducts= new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    stock:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]),
    //pattern numbers only '^((\\+91-?)|0)?[0-9]{11}$' "^[0-9]+$"  " /^[0-9]*$/"
    //pattern charachter only"/^[a-zA-Z]*$/"
    price:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]),
    brand:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]),
    category:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]),
    image:new FormControl('',[Validators.required]),


  })
  constructor(private _admin:AdminService,private route:Router,private _activeRoute:ActivatedRoute) {
   
   }

  ngOnInit(): void {
  }
  
  changePhoto(event:any){
    this.file=event.target.files
    console.log(event.target.files)
  }

  uploadPhoto(){
    const sendimage =new FormData()
    sendimage.append('profile',this.file[0])

    this._admin.addimage(sendimage).subscribe(res=>{
      console.log(res)
    })
  }
handleAddProducts(){
  this.isSubmitted=true
  // console.log(this.addProducts.value)
  this._admin.addProducts(this.addProducts.value).subscribe(res=>{

     console.log(res)

this.route.navigateByUrl('/Admin/ShowAllProducts')
  })
}
get name() {return this.addProducts.get('name')}
get stock(){return this.addProducts.get('stock')}
get price(){return this.addProducts.get('price')}
get brand(){return this.addProducts.get('brand')}
get category(){return this.addProducts.get('category')}
get image(){return this.addProducts.get('image')}



}
