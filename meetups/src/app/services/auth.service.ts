import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthorizedUser } from '../models/authorizedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = `${environment.baseUrl}/auth`;
  private userTokenSubject?: BehaviorSubject<string | null>;
  public currentUserToken?: Observable<string | null>;

  constructor(private http: HttpClient, private routes: Router) {
    this.userTokenSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('meetups_auth_token')!)
    );
    this.currentUserToken = this.userTokenSubject.asObservable();
  }

  login(email: string | null, password: string | null) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem(
              'meetups_auth_token',
              JSON.stringify(res.token)
            );
            this.userTokenSubject!.next(res.token);
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('meetups_auth_token');
    this.routes.navigate(['login']);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get user(): AuthorizedUser | null {
    const token = localStorage.getItem('meetups_auth_token');
    if (token) {
      const user: AuthorizedUser = this.parseJwt(token);
      return user;
    } else return null;
  }

  public get token(): string | null {
    return localStorage.getItem('meetups_auth_token');
  }
}
