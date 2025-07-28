import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCarsService {

   private apiUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  // لإضافة سيارة جديدة
  addClientCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // لجلب سيارات الكلينت حسب ID
  getClientCars(clientId: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?clientId=${clientId}`);
  }

  // لحذف سيارة
  deleteClientCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
