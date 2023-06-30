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
  styleUrls: ['./my-meetups.component.scss'],
})
export class MyMeetupsComponent implements OnInit {
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
        this.meetups = data.filter(
          (meetup) => meetup.createdBy === this.userId
        );
        this.filteredMeetups = data.filter(
          (meetup) => meetup.createdBy === this.userId
        );
        this.setPaginationTotalCount();
        this.getCurrentPageMeetups();
        this.loading = false;
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

  setPaginationCurrentPage() {
    this.pagination.currentPage =
      this.pagination.currentPage > this.pagination.lastPage
        ? this.pagination.lastPage
        : this.pagination.currentPage === 0
        ? 1
        : this.pagination.currentPage;
  }

  filter(filter: string) {
    const now = new Date();

    if (filter === 'future') {
      this.filteredMeetups = this.meetups.filter((meetup) => {
        return new Date(meetup.time) >= now;
      });
    } else if (filter === 'completed') {
      this.filteredMeetups = this.meetups.filter((meetup) => {
        return new Date(meetup.time) < now;
      });
    } else {
      this.filteredMeetups = this.meetups;
    }

    this.setPaginationTotalCount();
    this.setPaginationCurrentPage();
    this.getCurrentPageMeetups();
    this.cdr.detectChanges();
  }
}
