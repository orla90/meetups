import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(public usersService: UsersService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.cdr.detectChanges();
    });
  }
}
