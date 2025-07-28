import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientProfileComponent } from "./client-profile/client-profile.component";
import { MyRequestsComponent } from "./my-requests/my-requests.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { ClientCarsComponent } from "./client-cars/client-cars.component";

const routes:Routes=[
    
    {
      path:'client-profile',
      component:ClientProfileComponent
    },
    {
        path:'my-requests',
      component:MyRequestsComponent
    },
    {
        path:'update-profile/:id',
        component:UpdateProfileComponent
    },
    { path: 'client-cars/:id', component: ClientCarsComponent },
 { path: 'client-cars', component: ClientCarsComponent },

  

  { path: '', redirectTo: 'client-cars', pathMatch: 'full' },
  { path: '**', redirectTo: 'client-cars' }
    
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
  export class AppRoutingClientsModule { }
  