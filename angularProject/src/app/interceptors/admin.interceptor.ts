import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    let adminToken=localStorage.getItem('adminToken')
    if(adminToken){

      request=request.clone({
        headers:request.headers.set('Authorization',adminToken)
      })
    }
    return next.handle(request);
  }
}
