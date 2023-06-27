import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() public user?: User | null = null;
  @Output() public deleteUserEvent = new EventEmitter();

  roles = ['user', 'admin'];
  submitted = false;
  loading = false;
  userError?: string;
  selectedRole: string = '';
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private registrationService: RegistrationService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    if (this.user) {
      this.userForm.setValue({
        email: this.user.email,
        password: this.user.password,
        role: this.user.roles[0].name.toLowerCase(),
      });
      this.selectedRole = this.user.roles[0].name.toLowerCase();
    }
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get role() {
    return this.userForm.get('role');
  }

  deleteUser() {
    this.usersService.deleteUser(this.user!.id).subscribe({
      next: () => {
        this.deleteUserEvent.emit();
      },
    });
  }

  updateUser() {
    if (this.userForm.invalid) return;
    if (
      this.email?.value !== this.user?.email ||
      this.password?.value !== this.user?.password
    ) {
      this.usersService
        .updateUser(
          this.user!.id,
          this.email!.value!,
          this.password!.value!,
          this.user!.fio
        )
        .subscribe({});
    }
    if (
      this.user?.roles[0].name.toUpperCase() !== this.role?.value?.toUpperCase()
    ) {
      this.usersService
        .setRoles([this.role!.value!.toUpperCase()], this.user!.id)
        .subscribe();
    }
  }
}
