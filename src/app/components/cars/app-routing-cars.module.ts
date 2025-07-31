import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsModule } from "./cars.module";
import { AddCarsComponent } from "./add-cars/add-cars.component";
import { CarsDetailsComponent } from "./cars-details/cars-details.component";
import { CarsListComponent } from "./cars-list/cars-list.component";
import { CarsTypesComponent } from "./cars-types/cars-types.component";

const routes:Routes=[
    
    {
      path:'add-cars',
      component:AddCarsComponent
    },
    {
        path:'cars-details/:id',
      component:CarsDetailsComponent
    },
    {
        path:'cars-list',
        component:CarsListComponent
    },
    {
        path:'cars-types',
      component:CarsTypesComponent
    }
    
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
  export class AppRoutingCarsModule { }
  