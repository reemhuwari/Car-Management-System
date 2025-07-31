import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../services/car.service';


@Component({
  selector: 'app-cars-types',
  standalone: false,
  templateUrl: './cars-types.component.html',
  styleUrls: ['./cars-types.component.scss']
})
export class CarsTypesComponent implements OnInit {

  fuelTypes: string[] = ['Hybrid', 'Diesel', 'Electric', 'Petrol'];
  selectedFuelType: string = 'Hybrid';

  cars: any[] = [];
  searchedCars: any[] = [];
  editingCar: any = null;

  brandSearchTerm = '';
  yearSearchTerm = '';
  priceSearchTerm = '';

  userType: string = ''; // 'client' or 'customer'

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType') || '';
    this.loadCars();
  }

  selectFuelType(type: string) {
    this.selectedFuelType = type;
    this.searchCars();
  }

  loadCars() {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
      this.searchCars();
    });
  }

  searchCars() {
    let pool = (this.brandSearchTerm || this.yearSearchTerm || this.priceSearchTerm)
      ? this.cars
      : this.cars.filter(car => car.fuelType === this.selectedFuelType);

    this.searchedCars = pool
      .filter(car => car.brand.toLowerCase().includes(this.brandSearchTerm.toLowerCase()))
      .filter(car => car.year.toString().includes(this.yearSearchTerm))
      .filter(car => car.price.toString().includes(this.priceSearchTerm));
  }

  editCar(car: any) {
    this.editingCar = { ...car };
  }

  saveCar() {
    if (this.editingCar) {
      this.carService.updateCar( this.editingCar).subscribe(() => {
        const index = this.cars.findIndex(c => c.id === this.editingCar.id);
        if (index !== -1) this.cars[index] = { ...this.editingCar };
        this.editingCar = null;
        this.searchCars();
      });
    }
  }

  deleteCar(carId: string) {
    this.carService.deleteCar(carId).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== carId);
      this.searchCars();
    });
  }

  goToDetails(carId: string) {
    this.router.navigate(['/cars-details',carId]);
  }

  trackByCarId(index: number, car: any): string {
    return car.id;
  }
}
