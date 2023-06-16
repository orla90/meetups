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
      date: new Date(),
      venue: 'room 1',
      shortDescription: 'meetup 1 short description',
      longDescription: 'meetup 1 long description',
      targetAudience: 'analytics',
      shouldBeKnown: 'sql',
      agenda: 'project',
      reasonsToCome: 'interesting',
    },
    {
      id: 2,
      title: 'meetup 2',
      date: new Date(),
      venue: 'room 2',
      shortDescription: 'meetup 2 short description',
      longDescription: 'meetup 2 long description',
      targetAudience: 'analytics, developers',
      shouldBeKnown: 'JS',
      agenda: 'project',
      reasonsToCome: 'very interesting',
    },
    {
      id: 3,
      title: 'meetup 3',
      date: new Date(),
      venue: 'room 3',
      shortDescription: 'meetup 3 short description',
      longDescription: 'meetup 3 long description',
      targetAudience: 'managers',
      shouldBeKnown: 'ts',
      agenda: 'project',
      reasonsToCome: 'very very interesting',
    },
  ];
  constructor() {}
}
