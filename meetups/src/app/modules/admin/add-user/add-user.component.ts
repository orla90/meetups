import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { User } from 'src/app/classes/user';
import { EmailValidationService } from 'src/app/services/email-validation.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  @Input() public user?: User | null = null;
  @Output() public addUserEvent = new EventEmitter();

  submitted = false;
  loading = false;
  userError?: string;
  registrationSuccess?: string = '';
  registrationError?: string = '';

  addUserForm = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.emailValidationService.uniqueEmailValidator()]
    ),
    password: new FormControl('', [Validators.required]),
    fio: new FormControl('', [Validators.required]),
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private emailValidationService: EmailValidationService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    // this.emailValidationService.getRandomNumbers()
    // this.emailValidationService.getNumbers()
    // this.emailValidationService.getDelayedSum([1, 2, 3, 4])
  }

  get email() {
    return this.addUserForm.get('email');
  }
  get password() {
    return this.addUserForm.get('password');
  }
  get fio() {
    return this.addUserForm.get('fio');
  }

  submitApplication() {
    this.submitted = true;

    if (this.addUserForm.invalid) return;

    this.loading = true;
    this.registrationService
      .register(this.email!.value, this.password!.value, this.fio!.value)
      .subscribe({
        next: () => {
          this.registrationService.userAdded!.next(true);
          this.addUserEvent.emit();
          this.registrationSuccess = 'Success registration';
          setTimeout(() => (this.registrationSuccess = ''), 2000);
          this.submitted = false;
          this.addUserForm.reset();
        },
        error: (error: { error: string[] }) => {
          this.registrationError = error.error[0];
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
