import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent implements OnInit {
  file!:FileList 
  singleData:any
  isSubmitted:boolean=false
  editProducts= new FormGroup({
     name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),

    stock:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern("^[0-9]+$")]),
    // pattern numbers only '^((\\+91-?)|0)?[0-9]{11}$' "^[0-9]+$"  " /^[0-9]*$/"
    // pattern charachter only"/^[a-zA-Z]*$/"
     price:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(4),Validators.pattern("^[0-9]+$")]),
    brand:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern("^[A-z]+$")]),
    category:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern("^[A-z]+$")]),
    image:new FormControl('',[Validators.required]),


  })
  constructor(private _admin:AdminService,private activate:ActivatedRoute,private route:Router) {
    this.singleProduct()
    
    // console.log(this.singleData+"////////////////////////////")

   }
  ngOnInit(): void {
   
  }
  formValues(){
    this.editProducts.get('name')?.setValue(this.singleData.name);
    this.editProducts.get('stock')?.setValue(this.singleData.stock);

    this.editProducts.get('price')?.setValue(this.singleData.price);

    this.editProducts.get('brand')?.setValue(this.singleData.brand);

    this.editProducts.get('category')?.setValue(this.singleData.category);

   // this.editProducts.get('image')?.setValue(this.singleData.image);
  }
  singleProduct(){
    let productID = this.activate.snapshot.paramMap.get('productID')
    this._admin.showSingleProducts(productID).subscribe(res=>{
      console.log(res);
      this.singleData=res;
      this.formValues();
      
    })
    
    }

    changePhoto(event:any){
      this.file=event.target.files
      console.log(event.target.files)
    }
    uploadPhoto(){
      let productID=this.activate.snapshot.paramMap.get('productID')
      const sendimage =new FormData()
      sendimage.append('profile',this.file[0])
  
      this._admin.editphoto(sendimage,productID).subscribe(res=>{
        console.log(res)
      })
    }

  handleEditProducts(){
  this.isSubmitted=true
  let productID = this.activate.snapshot.paramMap.get('productID')
  console.log(productID)
  this._admin.updateProduct(this.editProducts.value,productID).subscribe(res=>{
    console.log(this.editProducts.value)
    console.log(res)
    this.route.navigateByUrl('Admin/ShowAllProducts')

  })
}
get name() {return this.editProducts.get('name')}
get stock(){return this.editProducts.get('stock')}
get price(){return this.editProducts.get('price')}
get brand(){return this.editProducts.get('brand')}
get category(){return this.editProducts.get('category')}
get image(){return this.editProducts.get('image')}


}
