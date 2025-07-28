import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CustomersService } from '../../../services/customers.service';
import { LookupService } from '../../../services/lookup.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl:'./customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  customerData: any = null;
countryName: string = '';
  cityName: string = '';
  errorMessage: string = '';
  constructor(private route: ActivatedRoute,private customerService:CustomersService,private router:Router,private lookupService: LookupService,) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (user && user.email) {
      // جلب بيانات العميل من الـ service باستخدام البريد الإلكتروني
      this.customerService.getCustomerData(user.email).subscribe(data => {
        if (data) {
          this.customerData = data;
          if (this.customerData.address?.country ?? '') {
            this.lookupService.getById(this.customerData.address?.country ?? '').subscribe(res => {
            
                 this.countryName = res.name;
            });
          }

          // اجلب اسم المدينة بناءً على ID
          if (this.customerData.address?.city ?? '') {
            this.lookupService.getById(this.customerData.address?.city ?? '').subscribe(res => {
            
              this.cityName = res.name;
            });
          }

        } else {
          this.errorMessage = 'لم يتم العثور على بيانات العميل';
        }
      });
    } else {
      this.errorMessage = 'لم يتم العثور على بيانات المستخدم';
      this.router.navigate(['/login']);
    }
  }

  editProfile(): void {
    this.router.navigate(['/update-customer', this.customerData.id]);
  }
}



