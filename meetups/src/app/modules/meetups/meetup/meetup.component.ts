import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';
import { checkWordDeclension } from 'src/app/helpers/utils';

@Component({
  selector: 'app-meetup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
})
export class MeetupComponent implements OnInit {
  @Input() public meetup!: Meetup;
  @Input() public userId!: number;
  @Output() public signMeetupEvent = new EventEmitter();
  @Output() public signOverMeetupEvent = new EventEmitter();

  longDescription: boolean = false;
  public canComeBtnVisible!: boolean;

  ngOnInit() {
    this.checkUserSign();
    // console.log('new date', new Date())
  }

  changeDescription() {
    this.longDescription = !this.longDescription;
    console.log(this.meetup);
    this.parseTime(this.meetup.time);
  }

  signMeetup() {
    this.checkUserSign();
    if (this.canComeBtnVisible) {
      this.signMeetupEvent.emit(this.meetup.id);
    }
    this.canComeBtnVisible = false;
  }

  signOverMeetup() {
    this.checkUserSign();
    if (!this.canComeBtnVisible) {
      this.signOverMeetupEvent.emit(this.meetup.id);
    }
    this.canComeBtnVisible = true;
  }

  checkUserSign() {
    this.canComeBtnVisible = !!!this.meetup.users.find(
      (user) => user.id === this.userId
    );
  }

  checkDeclension(number: number, words: Array<string>) {
    return checkWordDeclension(number, words);
  }

  parseTime(time: string) {
    const date = new Date(time);
    const day =
      date.getDate().toString().length < 2
        ? '0' + date.getDate()
        : date.getDate();
    const month =
      date.getMonth().toString().length < 2
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    const hours =
      date.getHours().toString().length < 2
        ? '0' + date.getHours()
        : date.getHours();
    const minutes =
      date.getMinutes().toString().length < 2
        ? '0' + date.getMinutes()
        : date.getMinutes();
    const seconds =
      date.getSeconds().toString().length < 2
        ? '0' + date.getSeconds()
        : date.getSeconds();

    const meetupDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    return meetupDate;
  }
}
