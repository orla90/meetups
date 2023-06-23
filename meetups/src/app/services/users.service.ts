import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = `${environment.baseUrl}/user`;
  constructor(private http: HttpClient) { }
  
  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
  
  addRole(name: string, userId: number) {
    return this.http.put(`${this.baseUrl}/role`, { name, userId });
  }
  
  editUser(id: number, email: string, password: string, fio: string) {
    return this.http.put(`${this.baseUrl}/${id}`, { email, password, fio });
  }
  
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
