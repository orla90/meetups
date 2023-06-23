import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth?: boolean;
  isAdmin: boolean = false;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.currentUserToken!.subscribe((data) => {
      this.isAuth = !!data;
      this.isAdmin = this.authService.user?.roles[0].name.toLowerCase() === "admin" ? true : false;
    });
  }
  
  logout() {
    this.authService.logout();
    this.isAuth = false;
  }
}
