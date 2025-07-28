import { Component } from '@angular/core';
import { UserType } from '../../enums/user.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 userType: UserType|null=null;


  constructor(private router: Router) {}
  ngOnInit(): void {
  const userData = localStorage.getItem('loggedInUser');
  console.log('User:', userData);               // ✅ راقب بيانات المستخدم
    
  if (!userData) {
    this.redirectToLogin();
    return;
  }

  try {
    const user = JSON.parse(userData);
    this.userType = user?.type;

    if (this.userType !== 'customer' && this.userType !== 'client') {
      this.redirectToLogin();
    }
  } catch (error) {
    console.error('خطأ في قراءة بيانات المستخدم:', error);
    this.redirectToLogin();
  }
}

private redirectToLogin(): void {
  this.router.navigate(['/login']);
}


  
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']); // غيّر '/login' حسب مسارك
  }
}

