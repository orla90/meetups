import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fio: new FormControl('', [Validators.required]),
  });
  submitted = false;
  loading = false;
  registrationError?: string;
  registrationSuccess?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef
  ) {
    this.registrationError = '';
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get fio() {
    return this.registrationForm.get('fio');
  }

  submitApplication() {
    this.submitted = true;

    if (this.registrationForm.invalid) return;

    this.loading = true;
    this.registrationService
      .register(this.email!.value, this.password!.value, this.fio!.value)
      .subscribe({
        next: () => {
          this.registrationSuccess = 'Success registration';
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/login';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error: { error: string[] }) => {
          this.registrationError =
            error.error[0] || 'Incorrect data. Please try again.';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
