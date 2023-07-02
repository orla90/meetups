import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  baseUrl: string = `${environment.baseUrl}/auth`;
  public userAdded?: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.userAdded = new Subject<boolean>();
  }

  register(email: string | null, password: string | null, fio: string | null) {
    return this.http.post(`${this.baseUrl}/registration`, {
      email,
      password,
      fio,
    });
  }
}
