import { Injectable } from '@angular/core';
import { Meetup } from '../classes/meetup';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  meetups: Array<Meetup> = [
    {
      id: 1,
      title: 'meetup 1',
      date: '14.08.22 13:00',
      venue: 'room 1',
      shortDescription: 'meetup 1 short description',
      longDescription: 'meetup 1 long description',
      targetAudience: 'analytics',
      shouldBeKnown: 'sql',
      agenda: 'project',
      reasonsToCome: 'interesting',
      subscribers: 100,
    },
    {
      id: 2,
      title: 'meetup 2',
      date: '14.08.22 13:00',
      venue: 'room 2',
      shortDescription: 'meetup 2 short description',
      longDescription: 'meetup 2 long description',
      targetAudience: 'analytics, developers',
      shouldBeKnown: 'JS',
      agenda: 'project',
      reasonsToCome: 'very interesting',
      subscribers: 200,
    },
    {
      id: 3,
      title: 'meetup 3',
      date: '14.08.22 13:00',
      venue: 'room 3',
      shortDescription: 'meetup 3 short description',
      longDescription: 'meetup 3 long description',
      targetAudience: 'managers',
      shouldBeKnown: 'ts',
      agenda: 'project',
      reasonsToCome: 'very very interesting',
      subscribers: 300,
    },
  ];
  constructor() {}

  findMeetups(searchInput = ''): Meetup[] {
    return this.meetups.filter((meetup) =>
      meetup.title.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
  }
}
