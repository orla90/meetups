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
  
  // name: string | null= '';
  // description: string = '';
  // time: string | Date= '';
  // duration?: number;
  // location: string | null = '';
  // target_audience: string | null = '';
  // need_to_know: string | null = '';
  // will_happen: string | null = '';
  // reason_to_come: string | null = '';

  createMeetup(
    name: string | null,
    description: string,
    time: string | Date,
    duration: number,
    location: string | null,
    target_audience: string | null,
    need_to_know: string | null,
    will_happen: string | null,
    reason_to_come: string | null
  ) {
    // console.log('createMeetup meetup', meetup)
    return this.http.post<{ meetup: Meetup }>(`${environment.baseUrl}/meetup`, {
      name,
      description,
      time,
      duration,
      location,
      target_audience,
      need_to_know,
      will_happen,
      reason_to_come,
    });
  }

  signToMeetup(idMeetup: number, idUser: number) {
    return this.http.put(`${environment.baseUrl}/meetup`, { idMeetup, idUser });
  }

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
