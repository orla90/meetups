import { Component } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent {
  constructor(public meetupService: MeetupService) {}
}
