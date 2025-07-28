import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';
import { UserType } from '../enums/user.enum';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientUrl:string="http://localhost:3000/clients";
  constructor(private http :HttpClient, private usersService:UsersService) { }
  getClients(email:string,password:string): Observable<Client | undefined>{
    return this.http.get<Client[]>(this.clientUrl).pipe(
    map(clients =>
      clients.find(client => client.email === email && client.password === password)
    ))
  
  }
  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.clientUrl}/${id}`);
  }
  addClient(newClient:Client):Observable<Object>{ 
      const user: User = {
      fullName: newClient.fullName,
      email: newClient.email,
      password:newClient.password,
      type: UserType.client
    }    
      return forkJoin({
                customer: this.http.post<Client>(this.clientUrl,newClient),
                 user:this.usersService.add(user)
        })
    
    
   }

getClientByEmail(email: string): Observable<Client | null> {
  return  this.http.get<Client[]>(`${this.clientUrl}?email=${email}`).pipe(
    map(clients => clients.length > 0 ? clients[0] : null)
  );
}


updateClient(id: string, updatedData: Partial<Client>): Observable<any> {
  return this.http.put(`${this.clientUrl}/${id}`, updatedData);
}
}
