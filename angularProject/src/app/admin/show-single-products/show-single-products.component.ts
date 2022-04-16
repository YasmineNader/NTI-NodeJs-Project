import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-show-single-products',
  templateUrl: './show-single-products.component.html',
  styleUrls: ['./show-single-products.component.css']
})
export class ShowSingleProductsComponent implements OnInit {
  singleData:any
  constructor(private _admin:AdminService,private _activate:ActivatedRoute) {
    this.singleProduct()
   }

  ngOnInit(): void {
  }
singleProduct(){
  let productID = this._activate.snapshot.paramMap.get('productID')
  this._admin.showSingleProducts(productID).subscribe(res=>{
    console.log(res)
    this.singleData=res
  })
  
}


}
