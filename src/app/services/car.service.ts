import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/cars';  
  constructor(private http: HttpClient) { }


  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCarDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  bookCar(id: string, carData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, carData);
  }

  getMyRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/requests/my`);
  }

getCarById(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);

}
getCarsByClientId(clientId: string) {
    return this.http.get<any[]>(`${this.apiUrl}?clientId=${clientId}`);
  }

  updateCar(car: Car) {
    return this.http.put(`${this.apiUrl}/${car.id}`, car);
  }

  deleteCar(carId: string |number) {
    return this.http.delete(`${this.apiUrl}/${carId}`);
  }






/*updateCar(id: number, carData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, carData);
}
*/


addCar(car: any) {
  return this.http.post<any>('http://localhost:3000/cars', car);
}

}


