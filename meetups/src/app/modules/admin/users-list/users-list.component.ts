import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users?: Observable<User[]>;
  public usersEmailArray: Array<string> = [];
  public loading: boolean = false;

  constructor(
    public usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() { 
    this.usersService.loadUsers();
    this.loading = true;
    this.users = this.usersService.items;
    this.usersService.items!.subscribe((users) => {
      this.usersEmailArray = users!.map((user) => user.email);
    });
    this.usersService.loadUsers();
    this.loading = false;
    this.cdr.detectChanges();
  }
}
