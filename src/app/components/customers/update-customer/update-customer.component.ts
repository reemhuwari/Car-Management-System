import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Customer from '../../../models/customer.model';
import { CustomersService } from '../../../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { Lookup } from '../../../models/lookup.model';
import { LookupService } from '../../../services/lookup.service';
import { LookupEnum } from '../../../enums/lookup.enum';

@Component({
  selector: 'app-update-customer',
  standalone: false,
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer!: Customer;
countries: Lookup[] = [];
cities: Lookup[] = [];



  constructor(
    private customerService:CustomersService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
  

  
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
              country: ['', Validators.required],
              city:['', Validators.required],
      })
      
    });
   this.lookupService.getAll(LookupEnum.country).subscribe(data => this.countries = data);

  const idParam = this.route.snapshot.paramMap.get('id')!;
if (idParam !== null && idParam !== undefined) {
  this.customerService.getCustomer(idParam).subscribe(
  data => {
    this.customer = data;
     if (data.address?.country) {
        this.lookupService.getAll(LookupEnum.city, data.address.country).subscribe(cities => {
          this.cities = cities;
        });
      }
    this.customerForm.patchValue({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: {
      country: data.address?.country || '',
      city: data.address?.city || '',
      
    }
      
    });
   });} else {
  console.error('المعرف غير موجود في الرابط');
  this.router.navigate(['/error']); 
  
}}
  onSubmit() {
    if (this.customerForm.valid&& this.customer?.id) {
      const updatedCustomer = { ...this.customer, ...this.customerForm.value };
      this.customerService.updateCustomer(this.customer.id, updatedCustomer).subscribe(() => {
        alert('تم تحديث المعلومات بنجاح');
        this.router.navigate(['/customer-profile']);
      });
    }
  }
  onCountryChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const countryId = selectElement.value;

  if (countryId) {
    this.lookupService.getAll(LookupEnum.city, countryId).subscribe(cities => {
      this.cities = cities;
      this.customerForm.get('address.city')?.setValue(''); // إعادة تعيين المدينة
    });
  }
}


  }
