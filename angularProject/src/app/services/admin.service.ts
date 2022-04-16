import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _admin:HttpClient) {
    
   }

   adminRegister(data:any):Observable<any>{
    return  this._admin.post('http://localhost:3000/admin/SignUp',data)
   }

   adminLogin(data:any):Observable<any>{
    return  this._admin.post('http://localhost:3000/admin/login',data)
   }


   editphoto(sendimage:any,productID:any):Observable<any>{
     return this._admin.post(`http://localhost:3000/uploadImage/${productID}`,sendimage)
   }
   logOut():Observable<any>{
     return this._admin.post("http://localhost:3000/admin/logOut",null)
   }
   addProducts(productvalue:any):Observable<any>{
     return this._admin.post('http://localhost:3000/admin/addProducts',productvalue)
   }
   showProducts():Observable<any>{
    return this._admin.get('http://localhost:3000/admin/allProducts')
  }
  showSingleProducts(productID:any):Observable<any>{
    return this._admin.get(`http://localhost:3000/admin/ShowSingle/${productID}`)
  }
  DeleteProduct(productID:any):Observable<any>{
    return this._admin.delete(`http://localhost:3000/admin/deleteProduct/${productID}`)
  }
  updateProduct(productData:any,productID:any){
    return this._admin.patch(`http://localhost:3000/admin/editProduct/${productID}`,productData)
  }
  showAllUser(){
    return this._admin.get('http://localhost:3000/admin/ShowAllUser')
  }

  deleteUser(userID:any){
    return this._admin.delete(`http://localhost:3000/admin/deleteUser/${userID}`)
  }
  addimage(sendimage:any){
    return this._admin.post("http://localhost:3000/addProduct/uploadImage",sendimage)
  }

  userBills(){
    return this._admin.get("http://localhost:3000/admin/Userbills")
  }
  
  changeBillStatus(BillId:any){
    return this._admin.get(`http://localhost:3000/admin/status/${BillId}`)
  }
  cancelBill(BillId:any){
    return this._admin.get(`http://localhost:3000/admin/cancelOrder/${BillId}`)
  }
  
}



