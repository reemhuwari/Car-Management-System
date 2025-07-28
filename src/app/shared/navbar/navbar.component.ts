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
 userType: UserType | null = null;


  constructor(private router: Router) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userType = user?.type; // يجب أن يكون عندك في بيانات المستخدم حقل type مثل 'client' أو 'customer'
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']); // غيّر '/login' حسب مسارك
  }
}

