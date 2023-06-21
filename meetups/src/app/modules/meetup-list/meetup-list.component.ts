import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';
import { User } from 'src/app/classes/user';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-meetup-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent implements OnInit {
  searchInput = '';
  meetups: Meetup[] = [];
  filteredMeetups: Meetup[] = [];
  
  constructor(public meetupService: MeetupService) {}

  ngOnInit() {
    this.meetupService.getMeetups().subscribe((data) => {
      this.meetups = data;
      this.filteredMeetups = data;
      console.log(this.meetups);
    });
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.filteredMeetups.filter((meetup) =>
      meetup.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
  }
}
