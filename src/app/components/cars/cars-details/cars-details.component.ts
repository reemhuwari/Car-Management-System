import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { CarService } from '../../../services/car.service';

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

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location

  ) {}

  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.carService.getCarById(id).subscribe(data => {
        this.car = data;
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
