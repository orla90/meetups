import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/classes/role';
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
        console.log("user is deleted");
        this.deleteUserEvent.emit();
        },
        error: error => {
          console.log("user is not deleted")
        }
      });
  }

  submitApplication() {
    this.submitted = true;

    if (this.userForm.invalid) return;

    this.loading = true;
  }
}
