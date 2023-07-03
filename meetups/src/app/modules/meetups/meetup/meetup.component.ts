import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meetup } from 'src/app/classes/meetup';
import {
  checkWordDeclension,
  parseLongDescription,
  parseShortDescription,
  parseTime,
} from 'src/app/helpers/utils';

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

  public longDescription: boolean = false;
  public canComeBtnVisible!: boolean;
  public isCompleted: boolean = false;
  public isCurUserMeetup: boolean = false;
  public dataListener!: Subscription;
  public isUpdatingPossible!: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.checkUserSign();
    this.isMeetupisCompleted();
    this.checkOwner();
    this.checkRoute();
  }

  checkOwner() {
    if (this.userId === this.meetup.owner?.id) {
      this.isCurUserMeetup = true;
    } else {
      this.isCurUserMeetup = false;
    }
  }

  checkRoute() {
    this.dataListener = this.route.data.subscribe((data) => {
      if (data['breadcrumb'].label === 'My Meetups') {
        this.isUpdatingPossible = true;
      } else if (data['breadcrumb'].label === 'All Meetups') {
        this.isUpdatingPossible = false;
      }
    });
  }

  isMeetupisCompleted() {
    const now = new Date();
    if (now > new Date(this.meetup.time)) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }

  changeDescription() {
    this.longDescription = !this.longDescription;
  }

  parseLongDescription() {
    return parseLongDescription(this.meetup.description);
  }

  parseShortDescription() {
    return parseShortDescription(this.meetup.description);
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
    this.canComeBtnVisible = !!!this.meetup.users!.find(
      (user) => user.id === this.userId
    );
  }

  checkDeclension(number: number, words: Array<string>) {
    return checkWordDeclension(number, words);
  }

  parseTime(time: string | Date) {
    return parseTime(time);
  }
}
