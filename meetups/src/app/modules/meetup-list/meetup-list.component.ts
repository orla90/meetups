import { Component } from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent {
  searchInput = '';
  meetups: Meetup[] = [];
  filteredMeetups: Meetup[] = [];

  constructor(public meetupService: MeetupService) {
    this.meetups = meetupService.meetups;
    this.filteredMeetups = meetupService.meetups;
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.meetupService.findMeetups(searchInput);
  }
}
