import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './admin/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { UserloginComponent } from './user/userlogin/userlogin.component'
import { UserInterceptor } from './interceptors/user.interceptor';
import { HomeComponent } from './user/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminInterceptor } from './interceptors/admin.interceptor';
import { UploadImagesComponent } from './admin/upload-images/upload-images.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NavbarAdminComponent } from './shared/navbar-admin/navbar-admin.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { ShowAllProductsComponent } from './admin/show-all-products/show-all-products.component';
import { ShowSingleProductsComponent } from './admin/show-single-products/show-single-products.component';
import { EditProductFormComponent } from './admin/edit-product-form/edit-product-form.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AddOrdersComponent } from './user/add-orders/add-orders.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserBillsComponent } from './user/user-bills/user-bills.component';
import { ShowUserBillsComponent } from './admin/show-user-bills/show-user-bills.component';
import { SingleUserCartComponent } from './user/single-user-cart/single-user-cart.component';
import { EditOrderComponent } from './user/edit-order/edit-order.component';
import { NavbarUserComponent } from './shared/navbar/navbar-user/navbar-user.component';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    RegisterComponent,
    LoginComponent,
    UserloginComponent,
    HomeComponent,
    FooterComponent,
    UploadImagesComponent,
    AdminHomeComponent,
    NavbarAdminComponent,
    AddProductsComponent,
    ShowAllProductsComponent,
    ShowSingleProductsComponent,
    EditProductFormComponent,
    AllUsersComponent,
    AddOrdersComponent,
    NotFound404Component,
    UserCartComponent,
    UserBillsComponent,
    ShowUserBillsComponent,
    SingleUserCartComponent,
    EditOrderComponent,
    NavbarUserComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi:true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
