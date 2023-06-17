import { Component } from '@angular/core';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
})
export class MeetupComponent {
  longDescription = false;

  changeDescription() {
    this.longDescription = !this.longDescription;
  }
}
