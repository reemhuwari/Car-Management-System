import { Injectable } from '@angular/core';
import { Lookup } from '../models/lookup.model';
import { Observable } from 'rxjs';
import { LookupEnum } from '../enums/lookup.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }
  
   apiUrl = 'http://localhost:3000/lookups'; 

  
 
  getAll(type?: LookupEnum, parentId?: string ): Observable<Lookup[]> {
    let url = this.apiUrl;
    if (type) {
      url += `?type=${type}`;``
      if (parentId) {
        url += `&parentId=${parentId}`;
      }
    }
    return this.http.get<Lookup[]>(url);
  }

  
  getById(id: number): Observable<Lookup> {
  return this.http.get<Lookup>(`${this.apiUrl}/${id}`);
}


}