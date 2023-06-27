import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  users: User[] = [];
  usersEmailArray: Array<string> = [];

  constructor(public usersService: UsersService, private cdr: ChangeDetectorRef, private registrationService: RegistrationService) {}

  ngOnInit() {
    this.getAllUsers();
  }
  
  getAllUsers() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.cdr.detectChanges();
      this.usersEmailArray = this.users.map(user => user.email);
    });
  }
  
  renewlist() {
    this.getAllUsers();
  }
}
