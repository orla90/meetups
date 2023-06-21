import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl: string = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {
  }
  
  register(email: string | null, password: string | null, fio:  string | null) {
    return this.http
    .post(`${this.baseUrl}/registration`, { email, password, fio })
  }
}
