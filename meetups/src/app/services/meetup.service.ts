import { Injectable } from '@angular/core';
import { Meetup } from '../classes/meetup';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  constructor(private http: HttpClient) {}

  getMeetups() {
    return this.http.get<Meetup[]>(`${environment.baseUrl}/meetup`);
  }

  createMeetup(meetup: Meetup) {
    return this.http.post<{ meetup: Meetup }>(`${environment.baseUrl}/meetup`, {
      meetup,
    });
  }

  signToMeetup(idMeetup: number, idUser: number) {
    return this.http.put(`${environment.baseUrl}/meetup`, { idMeetup, idUser });
  }

  // signOverMeetup(idMeetup: number, idUser: number){
  //   return this.http.delete<string>(`${environment.baseUrl}/meetup`, {
  //     idMeetup,
  //     idUser,
  //   });
  // }

  signOverMeetup(idMeetup: number, idUser: number) {
    return this.http.request('delete', `${environment.baseUrl}/meetup`, {
      body: { idMeetup, idUser },
    });
  }

  editMeetup(meetup: Meetup, id: number) {
    return this.http.put(`${environment.baseUrl}/meetup/${id}`, { meetup });
  }

  deleteMeetup(id: number) {
    return this.http.delete(`${environment.baseUrl}/meetup/${id}`);
  }
}
