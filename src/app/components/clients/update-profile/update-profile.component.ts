import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService } from '../../../services/lookup.service';
import { Client } from '../../../models/client.model';
import { Lookup } from '../../../models/lookup.model';
import { LookupEnum } from '../../../enums/lookup.enum';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  user: any = {
    fullName: '',
    email: '',
    phone: '',
    address: {
      country: '',
      city: ''
    }
  };

  fieldErrors = {
    fullName: false,
    phone: false,
    country: false,
    city: false
  };

 clientForm!: FormGroup;
  client!: Client;
countries: Lookup[] = [];
cities: Lookup[] = [];



  constructor(
    private clientService:ClientsService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
  

  
    this.clientForm = this.fb.group({
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
  this.clientService.getClient(idParam).subscribe(
  data => {
    this.client = data;
     if (data.address?.country) {
        this.lookupService.getAll(LookupEnum.city, data.address.country).subscribe(cities => {
          this.cities = cities;
        });
      }
    this.clientForm.patchValue({
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
    if (this.client?.id) {
      const updatedCustomer = { ...this.client, ...this.clientForm.value };
      this.clientService.updateClient(this.client.id, updatedCustomer).subscribe(() => {
        alert('تم تحديث المعلومات بنجاح');
        this.router.navigate(['/client-profile']);
      });
    }
  }
  onCountryChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const countryId = selectElement.value;

  if (countryId) {
    this.lookupService.getAll(LookupEnum.city, countryId).subscribe(cities => {
      this.cities = cities;
      this.clientForm.get('address.city')?.setValue(''); // إعادة تعيين المدينة
    });
  }
}


  }

