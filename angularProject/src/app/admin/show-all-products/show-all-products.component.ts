import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {
allProducts:any
  constructor(private _admin:AdminService,private _activate:ActivatedRoute,private route:Router) {
    this.allProduct()
   }

  ngOnInit(): void {
  }
allProduct(){
  this._admin.showProducts().subscribe(res=>{
    console.log(res)
    this.allProducts=res
  })
}

deleteProduct(iDOFProduct:any){
  //let productID = this._activate.snapshot.paramMap.get('productID')
  console.log(iDOFProduct)
  this._admin.DeleteProduct(iDOFProduct).subscribe(res=>{
    console.log(res)
   // window.location.reload()
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['/Admin/ShowAllProducts']);
  })

}
}
