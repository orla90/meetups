import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.scss']
})
export class MeetupFormComponent {
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
  
  constructor(
    private authService: AuthService,
  ) {

    this.meetupError = '';
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
  
  submitApplication() {
    this.submitted = true;
    
    // if (this.meetupForm.invalid) return;
    
    // this.loading = true;
    // this.authService.meetup(this.email!.value, this.password!.value).subscribe({
    //   next: () => {
    //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
    //     this.router.navigateByUrl(returnUrl);
    //   },
    //   error: error => {
    //     this.meetupError = error.error[0] || 'Incorrect username/password';
    //     this.loading = false;
    //     this.cdr.detectChanges();
    //   }
    // });
  }
}
