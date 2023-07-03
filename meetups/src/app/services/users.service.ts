import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = `${environment.baseUrl}/user`;
  items: Observable<User[]>;
  private _users: Subject<User[]>;
  private usersStore: {
    data: User[];
  };

  constructor(private http: HttpClient) {
    this.usersStore = { data: [] };
    this._users = new Subject<User[]>();
    this.items = this._users.asObservable();
  }

  get users() {
    return this._users.asObservable();
  }

  loadUsers() {
    return this.http.get<User[]>(this.baseUrl).subscribe(
      (users) => {
        this.usersStore.data = users;
        this._users.next(Object.assign({}, this.usersStore).data);
      },
      (error) => console.log(error)
    );
  }

  addRole(name: string, userId: number) {
    return this.http.put(`${this.baseUrl}/role`, { name, userId });
  }

  setRoles(names: Array<string>, userId: number) {
    return this.http.post(`${this.baseUrl}/role`, { names, userId });
  }

  updateUser(id: number, email: string, password: string, fio: string) {
    return this.http.put(`${this.baseUrl}/${id}`, { email, password, fio });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
