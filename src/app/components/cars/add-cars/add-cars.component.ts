import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-cars',
  standalone: false,
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
  newCar = {
    brand: '',
    model: '',
    year: null,
    price: null,
    type: '',
    status: '',
    image: '',
    fuelType: '',
    clientId: null
  };

  submitted = false;


  isDropZoneActive = false;
  previewImage: string | ArrayBuffer | null = null;

  constructor(private carService: CarService, private router: Router) {

  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
if (user?.id) {
  this.newCar.clientId = user.id;
} else {
  alert('يجب تسجيل الدخول أولاً');
  this.router.navigate(['/login']);
}

  }
 
  /*addCar(form: any) {
    console.log(this.newCar);
    this.submitted = true;
    if (form.invalid || !this.newCar.image) return;

    this.carService.addCar(this.newCar).subscribe({
      next: () => {
        alert('تمت إضافة السيارة بنجاح 🚗✅');
        this.router.navigate(['/client-cars']);
      },
      error: (err) => {
        console.error('حدث خطأ أثناء الإضافة:', err);
      }
    });
  }
addCar(form: NgForm) {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (!user?.id) return;

  const carToAdd = {
    ...this.newCar,
    clientId: user.id,
    image: this.previewImage || 'assets/images/default.jpg'
  };

  this.carService.addCar(carToAdd).subscribe(() => {
    form.resetForm();
    this.previewImage = null;
  });
  this.carService.addCar(carToAdd).subscribe(() => {
  alert('تمت إضافة السيارة بنجاح 🚗✅');
  this.router.navigate(['/client-cars']);
});

}*/
addCar(form: NgForm) {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (!user?.id) return;

  const carToAdd = {
    ...this.newCar,
    clientId: user.id,
    /*image: this.previewImage || 'assets/images/default.jpg'*/
  };

  this.carService.addCar(carToAdd).subscribe(() => {
    alert('تمت إضافة السيارة بنجاح 🚗✅');
    form.resetForm();
    this.previewImage = null;
    this.router.navigate(['/client-cars',user.id]); // انتقل لصفحة سيارات الكلينت
  });
}



  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDropZoneActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDropZoneActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDropZoneActive = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.handleImage(file);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) this.handleImage(file);
  }//

  handleImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
      this.newCar.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  removeImage() {
    this.newCar.image = '';
    this.previewImage = null;
  }

}
