import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../services/lookup.service';


@Component({
  selector: 'app-client-profile',
  standalone: false,
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  isDarkMode: boolean = false;
  user: any = null;
   email=''
  clientData: any = null;
  countryName: string = '';
  cityName: string = '';
  errorMessage: string = '';
noData:any|null;
  constructor(private route: ActivatedRoute,private clientService:ClientsService,private router:Router,private lookupService: LookupService,) {}


  ngOnInit(): void {
  
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (user && user.email) {
      // جلب بيانات العميل من الـ service باستخدام البريد الإلكتروني
      this.clientService.getClientByEmail(user.email).subscribe(data => {
        if (data) {
          this.clientData = data;
          if (this.clientData.address?.country ?? '') {
            this.lookupService.getById(this.clientData.address?.country ?? '').subscribe(res => {
            
                 this.countryName = res.name;
            });
          }

          // اجلب اسم المدينة بناءً على ID
          if (this.clientData.address?.city ?? '') {
            this.lookupService.getById(this.clientData.address?.city ?? '').subscribe(res => {
            
              this.cityName = res.name;
            });
          }

        } else {
          this.errorMessage = 'لم يتم العثور على بيانات العميل';
        }
      });
    } else {
      this.errorMessage = 'لم يتم العثور على بيانات العميل';
      this.router.navigate(['/login']);
    }
  }

  /*editProfileClient(): void {
    this.router.navigate(['/update-profile', this.clientData.id]);
  }*/

editProfileClient(): void {
  console.log('clientData.id:', this.clientData?.id);
  if (this.clientData?.id) {
    this.router.navigate(['/update-profile', this.clientData.id]);
  } else {
    console.error('لم يتم العثور على معرّف العميل');
  }
}




  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  loadUserData() {
    
    if (this.email) {
      this.clientService.getClientByEmail(this.email).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('حدث خطأ أثناء تحميل بيانات المستخدم:', error);
        }
      );
    }
  }

  logout(): void {
    localStorage.clear();
    location.href = '/login';
  }
}
