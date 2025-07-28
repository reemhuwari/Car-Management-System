import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCarsService } from '../../../services/client-cars.service';
import { Car } from '../../../models/car.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-cars',
 standalone:false,
  templateUrl: './client-cars.component.html',
  styleUrl: './client-cars.component.scss'
})
export class ClientCarsComponent implements OnInit {
  
 allCars: any[] = [];
  filteredCars: any[] = [];
  searchQuery: string = '';
  fuelType: string | null = '';
  clientId: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute,private clientCarsService: ClientCarsService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.clientId = user?.id;

    this.route.queryParamMap.subscribe((params) => {
      this.fuelType = params.get('fuel');
      this.loadCars();
    });
  }

  loadCars(): void {
    this.http.get<any[]>('http://localhost:3000/cars').subscribe((cars) => {
      this.allCars = cars.filter(car =>
        car.clientId === this.clientId &&
        (!this.fuelType || car.fuelType === this.fuelType)
      );
      this.filterCars();
    });
  }

  filterCars(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredCars = this.allCars.filter(car =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query)
    );}

    deleteCar(id: string): void {
  if (confirm('هل أنت متأكد أنك تريد حذف هذه السيارة؟')) {
    this.clientCarsService.deleteClientCar(id).subscribe(() => {
       this.allCars = this.allCars.filter(car => car.id !== id);
      this.filterCars();});
  }
}


    
}


 


