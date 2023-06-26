import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';

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
  }

  changeDescription() {
    this.longDescription = !this.longDescription;
    console.log(this.meetup)
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
    this.canComeBtnVisible = !!!this.meetup.users.find(user => user.id === this.userId)
  }
}
