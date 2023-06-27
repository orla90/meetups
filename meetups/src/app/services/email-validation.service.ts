import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  empty,
  filter,
  interval,
  map,
  of,
  range,
  shareReplay,
  skip,
  startWith,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
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

  getRandomNumbers() {
    interval(1000)
      .pipe(
        startWith(-1),
        map(() => Math.random()),
        shareReplay({ refCount: true, bufferSize: 1 })
      )
      .subscribe(console.log);
  }

  getNumbers() {
    const source = range(1, 90);
    const secondSource = of(8, 1, 9, 22);

    source
      .pipe(
        take(50),
        filter((num) => num < 40 && num > 30),
        skip(3),
        withLatestFrom(secondSource)
      )
      .subscribe(console.log);
  }
  
  getSum(arr: Array<number>) {
    const sum = arr.reduce((sum, num) => sum + num, 0);
    return sum;
  }
  
  getDelayedSum(arr: Array<number>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.getSum(arr));
      }, 2000);
    }).then((res) => console.log(res));
  }
}
