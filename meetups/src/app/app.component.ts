import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'meetups';
  
  constructor(private bnIdle: BnNgIdleService, private router: Router) { }
  
  ngOnInit(): void {
    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        localStorage.removeItem('meetups_auth_token');
        this.router.navigate(['/login']);
        this.bnIdle.stopTimer();
      }
    });
  }
}
