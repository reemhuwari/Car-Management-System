import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { CarService } from '../../../services/car.service';
import { ClientsService } from '../../../services/clients.service';
import { UserType } from '../../../enums/user.enum';

@Component({
  selector: 'app-cars-details',
  standalone: false,
  templateUrl: './cars-details.component.html',
  styleUrls: ['./cars-details.component.scss']
})
export class CarsDetailsComponent implements OnInit {

  car: any = null;
  showBookingForm = false;
  bookingDate = '';
  returnDate = '';
  city = '';
  street = '';
  cardNumber = '';
  userType:any='';
  client: any=null ;
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location,
    private clientService:ClientsService
  ) {}

  

ngOnInit() {
  this.userType = localStorage.getItem('userType') || '';
  console.log('👤 User type:', this.userType);

  const id = String(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.carService.getCarById(id).subscribe(data => {
      this.car = data;
      console.log('🚗 Car:', this.car);

      if (this.car.clientId) {
       
    
        this.clientService.getClient(this.car.clientId).subscribe(
          clientData => {
            this.client = clientData;
            }
        );
      }
    });
  }
}

  toggleBookingForm() {
    if (this.car.status.toLowerCase() === 'available') {
      this.showBookingForm = true;
    } else {
      alert('⚠ السيارة غير متاحة حالياً');
    }
  }
  confirmBooking() {
    if (this.bookingDate && this.returnDate && this.city && this.street && this.cardNumber) {
      // تحديث الحالة إلى Not available
      const updatedCar = { ...this.car, status: 'Not available' };

      this.carService.updateCar(updatedCar).subscribe(() => {
        alert('✅ تم الحجز بنجاح!');
        this.car.status = 'Not available';  // تحديث الحالة في الواجهة مباشرة
        this.showBookingForm = false;
      }, error => {
        alert('❌ حدث خطأ أثناء تحديث حالة السيارة');
        console.error(error);
      });

    } else {
      alert('⚠ يرجى تعبئة جميع الحقول');
    }
  }
  goBack() {
    this.location.back();
  }


}
