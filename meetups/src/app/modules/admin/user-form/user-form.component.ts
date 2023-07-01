import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';

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
    private usersService: UsersService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
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
        this.updateApiUser();
      } else if (item === 'ok' && type === 'delete') {
        this.deleteApiUser();
      }
    });
  }

  deleteUser() {
    const title = 'Удалить пользователя';
    const body = 'Вы уверены, что хотите удалить пользователя?';
    this.openDialog('delete', title, body);
  }

  updateUser() {
    if (this.userForm.invalid) return;
    const title = 'Обновить пользователя';
    const body = 'Вы уверены, что хотите обновить пользователя?';
    this.openDialog('update', title, body);
  }

  updateApiUser() {
    if (this.userForm.invalid) return;
    this.loading = true;
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
        .subscribe();
    }
    if (
      this.user?.roles[0].name.toUpperCase() !== this.role?.value?.toUpperCase()
    ) {
      this.usersService
        .setRoles([this.role!.value!.toUpperCase()], this.user!.id)
        .subscribe();
    }
    this.loading = false;
  }

  deleteApiUser() {
    this.loading = true;
    this.usersService.deleteUser(this.user!.id).subscribe();
  }
}
