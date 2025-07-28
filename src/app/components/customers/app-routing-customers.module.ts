import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CustomerProfileComponent } from "./customer-profile/customer-profile.component";
import { UpdateCustomerComponent } from "./update-customer/update-customer.component";
import { BrowserModule } from "@angular/platform-browser";

const routes:Routes=[
    
    {
      path:'customer-profile',
      component:CustomerProfileComponent
    },
    {
        path:'update-customer/:id',
      component:UpdateCustomerComponent
    },
   
   
    
  ]
  
  @NgModule({
    
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    
    
    ],
    exports:[
      RouterModule
    ]
  })
  export class AppRoutingCustomersModule { }
  