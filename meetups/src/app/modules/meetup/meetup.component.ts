import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';

@Component({
  selector: 'app-meetup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
})
export class MeetupComponent {
  @Input() public meetup?: Meetup;

  longDescription = false;

  changeDescription() {
    this.longDescription = !this.longDescription;
  }
}
