import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import Customer from '../models/customer.model';

import { User } from '../models/user.model';
import { UserType } from '../enums/user.enum';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
   customerUrl:string="http://localhost:3000/customers";
   
  constructor(private http :HttpClient ,private usersService:UsersService) { }
  
  addCustomers(newCustomer:Customer ):Observable<object>{
  
    return this.http.get<Customer[]>(this.customerUrl).pipe(
      map(customers => {
        const existingCustomer = customers.find(c => c.email === newCustomer.email);
        if (existingCustomer) {
          throw new Error('العميل موجود بالفعل');
        }
        const user: User = {
          fullName: newCustomer.fullName,
          email: newCustomer.email,
          password: newCustomer.password,
          type: UserType.customer
        };
        return user;
      }),
      switchMap(user => {
        return forkJoin({
          customer: this.http.post<Customer>(this.customerUrl, newCustomer),
          user: this.usersService.add(user) 
        });
      })
    );
  }


  /*
     const user: User = {
         fullName: newCustomer.fullName,
         email: newCustomer.email,
         password:newCustomer.password,
         type: UserType.customer
       }
        return forkJoin({
          customer: this.http.post<Customer>(this.customerUrl,newCustomer),
           user:this.usersService.add(user)
  })*/
   
 
   updateCustomer(id: string, updatedCustomer: Customer): Observable<any> {
    return this.http.put(`${this.customerUrl}/${id}`, updatedCustomer);
  }


  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.customerUrl}/${id}`);
  }
    
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerUrl}/${id}`);
  }

    // استرجاع جميع العملاء
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

// دالة لاسترجاع بيانات العميل فقط
getCustomerData(email: string): Observable<any> {
  return this.http.get<any[]>(this.customerUrl).pipe(
    map(users => users.find(u => u.email === email)),
    catchError(() => of(undefined))
  );
}


   
}
