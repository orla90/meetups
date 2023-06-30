import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';
import { Pagination } from 'src/app/classes/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-meetup-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent implements OnInit {
  public searchInput: string = '';
  public meetups: Meetup[] = [];
  public filteredMeetups: Meetup[] = [];
  public currentPageMeetups: Meetup[] = [];
  public pagination = new Pagination();
  public userId!: number;
  public loading: boolean = false;

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.userId = this.authService.user!.id;
  }

  ngOnInit() {
    this.loading = true;
    this.authService.user &&
      this.meetupService.getMeetups().subscribe((data) => {
        this.meetups = data;
        this.filteredMeetups = data;
        this.setPaginationTotalCount();
        this.getCurrentPageMeetups();
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  signMeetupEvent(idMeetup: number) {
    this.meetupService
      .signToMeetup(idMeetup, this.authService.user!.id)
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  signOverMeetup(idMeetup: number) {
    this.meetupService
      .signOverMeetup(idMeetup, this.authService.user!.id)
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  setPaginationTotalCount() {
    this.pagination.totalCount = this.filteredMeetups.length;
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.meetups.filter((meetup) =>
      meetup.name!.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
    this.setPaginationTotalCount();
    this.setPaginationCurrentPage();
    this.getCurrentPageMeetups();
    this.cdr.detectChanges();
  }
  
  setPaginationCurrentPage() {
    this.pagination.currentPage =
      this.pagination.currentPage > this.pagination.lastPage
        ? this.pagination.lastPage
        : this.pagination.currentPage === 0
        ? 1
        : this.pagination.currentPage;
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
  
  filter(filter: string) {
    console.log(filter);
    const now = new Date();
    
    if (filter === "future") {
      this.filteredMeetups = this.meetups.filter(meetup => {
        return new Date(meetup.time) >= now;
      })
    } else if (filter === "completed") {
      this.filteredMeetups = this.meetups.filter(meetup => {
        return new Date(meetup.time) < now;
      })
    } else {
      this.filteredMeetups = this.meetups;
    }
    
    this.setPaginationTotalCount();
    this.setPaginationCurrentPage();
    this.getCurrentPageMeetups();
    this.cdr.detectChanges();
    console.log(this.filteredMeetups);
  }
}
