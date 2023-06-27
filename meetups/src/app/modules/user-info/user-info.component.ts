import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthorizedUser } from 'src/app/models/authorizedUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  user: AuthorizedUser | null;
  
  constructor(private authService: AuthService) { 
    this.user = this.authService.user;
  }
}
