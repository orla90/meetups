import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  private exists: boolean = false;
  baseUrl: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  emailExists() {
    return this.http.get<User[]>(this.baseUrl).pipe(
      debounceTime(1000),
      map((response) => {
        const users = response.map((response) => response.email);
        return users;
      }),
      distinctUntilChanged()
    );
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists().pipe(
        map((res) => {
          if (res.includes(control.value)) {
            return { emailExists: true };
          } else return null;
        }),
        catchError(async (err) => null)
      );
    };
  }
}
