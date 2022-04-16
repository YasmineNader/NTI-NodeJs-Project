import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let token=localStorage.getItem('token')
   // console.log(token) `bearer ${token}`
    if(token){
      //console.log('test')
        request=request.clone({
        headers:request.headers.set('Authorization', token)
      })
    }
    return next.handle(request);
  }
}
