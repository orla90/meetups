import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { User } from 'src/app/classes/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];
  public usersEmailArray: Array<string> = [];
  public loading: boolean = false;

  constructor(
    public usersService: UsersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
      this.usersEmailArray = this.users.map((user) => user.email);
      this.cdr.detectChanges();
    });
  }

  renewlist() {
    this.getAllUsers();
  }
}
