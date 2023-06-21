import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth?: boolean;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.currentUserToken!.subscribe((data) => (this.isAuth = !!data));
  }
  
  logout() {
    this.authService.logout();
    this.isAuth = false;
  }
}
