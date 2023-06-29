import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-meetup-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.scss'],
})
export class MeetupFormComponent implements OnInit, OnDestroy {
  meetupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    short_description: new FormControl('', [Validators.required]),
    long_description: new FormControl('', [Validators.required]),
    target_audience: new FormControl('', [Validators.required]),
    need_to_know: new FormControl('', [Validators.required]),
    will_happen: new FormControl('', [Validators.required]),
    reason_to_come: new FormControl('', [Validators.required]),
  });
  submitted = false;
  loading = false;
  meetupError?: string;
  sub!: Subscription;
  formType?: string;
  title?: string;

  constructor(
    private meetupService: MeetupService,
    private route: ActivatedRoute
  ) {
    this.meetupError = '';
  }

  ngOnInit(): void {
    this.sub = this.route.data.subscribe((data) => {
      this.formType = data['breadcrumb'];
      console.log(this.formType);
      if (this.formType == 'Create Meetup') {
        this.title = 'Создание митапа';
      } else {
        this.title = 'Редактирование митапа';
      }
    });
  }

  get name() {
    return this.meetupForm.get('name');
  }
  get date() {
    return this.meetupForm.get('date');
  }
  get time() {
    return this.meetupForm.get('time');
  }
  get location() {
    return this.meetupForm.get('location');
  }
  get short_description() {
    return this.meetupForm.get('short_description');
  }
  get long_description() {
    return this.meetupForm.get('long_description');
  }
  get target_audience() {
    return this.meetupForm.get('target_audience');
  }
  get need_to_know() {
    return this.meetupForm.get('need_to_know');
  }
  get will_happen() {
    return this.meetupForm.get('will_happen');
  }
  get reason_to_come() {
    return this.meetupForm.get('reason_to_come');
  }

  saveMeetup() {
    this.submitted = true;

    if (this.meetupForm.invalid) return;

    const name = this.name!.value;
    const description = JSON.stringify({
      long: this.long_description?.value,
      short: this.short_description?.value,
    });
    const time = new Date(this.date?.value + ' ' + this.time?.value);
    const duration = 60;
    const location = this.location!.value;
    const target_audience = this.target_audience!.value;
    const need_to_know = this.need_to_know!.value;
    const will_happen = this.will_happen!.value;
    const reason_to_come = this.reason_to_come!.value;

    this.loading = true;

    this.meetupService
      .createMeetup(
        name,
        description,
        time,
        duration,
        location,
        target_audience,
        need_to_know,
        will_happen,
        reason_to_come
      )
      .subscribe({
        next: () => {
          console.log('success');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
