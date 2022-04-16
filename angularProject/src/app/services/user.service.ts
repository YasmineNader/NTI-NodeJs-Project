import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _user:HttpClient) { }

  userRegister(data:any):Observable<any>{
    return this._user.post("http://localhost:3000/user/SignUp",data)

  }

  userLogin(data:any):Observable<any>{
    return this._user.post("http://localhost:3000/user/login",data)

  }
  
  alldata():Observable<any>{
    return this._user.get("http://localhost:3000/user/allProducts")

  }
  logOut():Observable<any>{
    return this._user.post("http://localhost:3000/user/logOut",null)

  }
  userDeleteHimself():Observable<any>{
    return this._user.delete("http://localhost:3000/user/delete")

  }
  
  

  orderDetails(productID:any):Observable<any>{
    return this._user.get( `http://localhost:3000/user/orderDetails/${productID}`)
  }
  



  addOrder(userID:any,productID:any,orderData:any):Observable<any>{
   var data={
  'user_id':userID
      ,'products':[{
    '_id' : productID,
                'quantity' : orderData['quantity'],
                'name' : orderData['name'],
                'color' : orderData['color'],
                'price' : orderData['price'],
                'category' : orderData['category'],


      }]
 
    }
    

    return this._user.post(`http://localhost:3000/user/AddOrder/${productID}`, data)

  }
  
  orderBills():Observable<any>{
    return this._user.post( "http://localhost:3000/user/bills",null)
  }

  AllUserOrders(UserID:any):Observable<any>{
    return this._user.get(`http://localhost:3000/user/ShowAllOrders/${UserID}`)
  }

  UserSingleOrder(OrderID:any):Observable<any>{
    return this._user.get( `http://localhost:3000/user/singleOrder/${OrderID}`)
  }
  UserDeleteOrder(OrderID:any):Observable<any>{
    return this._user.delete( `http://localhost:3000/user/deleteOrder/${OrderID}`)
  }  
  
  UserEditOrder(OrderID:any,orderData:any):Observable<any>{
    return this._user.patch( `http://localhost:3000/user/editOrder/${OrderID}`,orderData)
  } 
 
}

