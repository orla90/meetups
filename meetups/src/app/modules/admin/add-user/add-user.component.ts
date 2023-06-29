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
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';
import { EmailValidationService } from 'src/app/services/email-validation.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';

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
    private registrationService: RegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
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
          this.submitted = false;
          this.addUserForm.reset();

          const type = 'congratulations';
          const title = 'Поздравляем!';
          const body = 'Вы успешно создали нового пользователя';
          this.openDialog(type, title, body);
        },
        error: (error: { error: string[] }) => {
          this.registrationError = error.error[0];
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
