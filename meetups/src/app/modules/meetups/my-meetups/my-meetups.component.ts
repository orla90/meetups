import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Meetup } from 'src/app/classes/meetup';
import { Pagination } from 'src/app/classes/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-my-meetups',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.scss']
})
export class MyMeetupsComponent {
  searchInput: string = '';
  // createdNewUser: boolean = false;
  meetups: Meetup[] = [];
  filteredMeetups: Meetup[] = [];
  currentPageMeetups: Meetup[] = [];
  pagination = new Pagination();
  userId!: number;

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.userId = this.authService.user!.id;
  }

  ngOnInit() {
    // if (this.router.url === '/')
    // console.log('this.router.url', this.router.url)
    // console.log('user', this.authService.user)
    
    this.authService.user &&
      this.meetupService.getMeetups().subscribe((data) => {
        console.log('data', data);
        console.log('userId', this.userId);
        // console.log(this.authService.user);
        this.meetups = data.filter(meetup => meetup.createdBy === this.userId);
        this.filteredMeetups = data.filter(meetup => meetup.createdBy === this.userId);
        this.setPaginationTotalCount();
        this.getCurrentPageMeetups();
        this.cdr.detectChanges();
      });
  }
  
  signMeetupEvent(idMeetup: number) {
    this.meetupService.signToMeetup(idMeetup, this.authService.user!.id).subscribe({
        next: () => {
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
          // this.router.navigateByUrl(returnUrl);
        // this.createdNewUser = true;
        // console.log('success')
        },
      error: error => {
        // console.log('fail')

          // this.meetupError = error.error[0] || 'Incorrect username/password';
          // this.loading = false;
          // this.cdr.detectChanges();
        }
      })
  }
  
  signOverMeetup(idMeetup: number) {
    // console.log('idMeetup', idMeetup)
    // console.log('this.authService.user!.id', this.authService.user!.id)
    this.meetupService.signOverMeetup(idMeetup, this.authService.user!.id).subscribe({
        next: () => {
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
          // this.router.navigateByUrl(returnUrl);
        // this.signedToMeetup = true;
        // console.log('success over')
        },
      error: error => {
        // console.log('fail')

          // this.meetupError = error.error[0] || 'Incorrect username/password';
          // this.loading = false;
          // this.cdr.detectChanges();
        }
      })
  }

  setPaginationTotalCount() {
    this.pagination.totalCount = this.filteredMeetups.length;
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.meetups.filter((meetup) =>
      meetup.name!.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
    this.setPaginationTotalCount();
    this.pagination.currentPage =
      this.pagination.currentPage > this.pagination.lastPage
        ? this.pagination.lastPage
        : this.pagination.currentPage === 0
        ? 1
        : this.pagination.currentPage;
    this.getCurrentPageMeetups();
    this.cdr.detectChanges();
  }

  onPaginationChange(pagination: Pagination): void {
    this.pagination = pagination;
    this.getCurrentPageMeetups();
  }

  getCurrentPageMeetups(): void {
    const currentPage = this.pagination.currentPage;
    const pageSize = this.pagination.pageSize;
    this.currentPageMeetups = this.filteredMeetups.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    );
  }
}
