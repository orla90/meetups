import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetupService } from 'src/app/services/meetup.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { Meetup } from 'src/app/classes/meetup';
import {
  parseLongDescription,
  parseShortDescription,
  parseTime,
} from 'src/app/helpers/utils';

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

  public submitted = false;
  public loading = false;
  public meetupError?: string;
  public dataListener!: Subscription;
  public routeListener!: Subscription;
  public formType?: string;
  public title?: string;
  public id!: number;
  public currentMeetup?: Meetup;


  constructor(
    private meetupService: MeetupService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.meetupError = '';
  }

  ngOnInit(): void {
    this.setFormType();
    this.setMeetupId();
  }

  setFormType() {
    this.dataListener = this.route.data.subscribe((data) => {
      this.formType = data['breadcrumb'].label;
      if (this.formType == 'Create Meetup') {
        this.title = 'Создание митапа';
      } else {
        this.title = 'Редактирование митапа';
        this.getCurrentMeetup();
      }
    });
  }

  setMeetupId() {
    this.routeListener = this.route.params.subscribe((params) => {
      this.id = +params['id'];
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

  getCurrentMeetup() {
    this.meetupService.getMeetups().subscribe((data) => {
      this.currentMeetup = data.find((meetup) => meetup.id === this.id);
      if (this.currentMeetup) {
        this.setCurrentMeetupValues();
      }
    });
  }

  setCurrentMeetupValues() {
    const comingDate = parseTime(this.currentMeetup!.time)
      .split(' ')[0]
      .split('.');
    const date =
      '20' + comingDate[2] + '-' + comingDate[1] + '-' + comingDate[0];
    const time = parseTime(this.currentMeetup!.time).split(' ')[1];
    this.meetupForm.setValue({
      name: this.currentMeetup!.name,
      short_description: parseShortDescription(this.currentMeetup!.description),
      long_description: parseLongDescription(this.currentMeetup!.description),
      date: date,
      time: time,
      location: this.currentMeetup!.location,
      target_audience: this.currentMeetup!.target_audience,
      need_to_know: this.currentMeetup!.need_to_know,
      will_happen: this.currentMeetup!.will_happen,
      reason_to_come: this.currentMeetup!.reason_to_come,
    });
  }

  openDialog(type: string, title: string, body: string) {
    const _dialog = this.dialog.open(DialogWindowComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        type: type,
        title: title,
        body: body,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item === 'ok' && type === 'update') {
        this.updateApiMeetup();
      } else if (item === 'ok' && type === 'delete') {
        this.deleteApiMeetup();
      }
    });
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
          const type = 'congratulations';
          const title = 'Поздравляем!';
          const body = 'Вы успешно создали митап.';
          this.openDialog(type, title, body);
          this.router.navigate(['/my-meetups']);
        },
        error: (error) => {
          const type = 'error';
          const title = 'Ошибка';
          const body =
            'К сожалению, не удалось создать митап. Повторите попытку позднее.';
          this.openDialog(type, title, body);
        },
      });
  }

  delete() {
    if (this.formType === 'Create Meetup') {
      this.meetupForm.reset();
    } else if (this.formType === 'Edit Meetup') {
      const title = 'Удалить митап';
      const body = 'Вы уверены, что хотите удалить митап?';
      this.openDialog('delete', title, body);
    }
  }

  cancel() {
    this.meetupForm.reset();
    this.router.navigate(['/my-meetups']);
  }

  updateMeetup() {
    if (this.meetupForm.invalid) return;
    const title = 'Обновить митап';
    const body = 'Вы уверены, что хотите обновить митап?';
    this.openDialog('update', title, body);
  }

  updateApiMeetup() {
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

    this.meetupService
      .updateMeetup(
        name,
        description,
        time,
        duration,
        location,
        target_audience,
        need_to_know,
        will_happen,
        reason_to_come,
        this.id
      )
      .subscribe({
        next: () => {
          const type = 'congratulations';
          const title = 'Поздравляем!';
          const body = 'Вы успешно обновили митап.';
          this.openDialog(type, title, body);
          this.router.navigate(['/my-meetups']);
        },
        error: () => {
          const type = 'error';
          const title = 'Ошибка';
          const body =
            'К сожалению, не удалось обновить митап. Повторите попытку позднее.';
          this.openDialog(type, title, body);
        },
      });
  }

  deleteApiMeetup() {
    this.meetupService.deleteMeetup(this.id).subscribe({
      next: () => {
        const type = 'congratulations';
        const title = 'Поздравляем!';
        const body = 'Вы успешно удалили митап.';
        this.openDialog(type, title, body);
        this.router.navigate(['/my-meetups']);
      },
      error: () => {
        const type = 'error';
        const title = 'Ошибка';
        const body =
          'К сожалению, не удалось удалить митап. Повторите попытку позднее.';
        this.openDialog(type, title, body);
      },
    });
  }

  submit() {
    if (this.formType == 'Create Meetup') {
      this.saveMeetup();
    } else {
      this.title = 'Редактирование митапа';
      this.updateMeetup();
    }
  }

  ngOnDestroy(): void {
    this.dataListener.unsubscribe();
    this.routeListener.unsubscribe();
  }
}
