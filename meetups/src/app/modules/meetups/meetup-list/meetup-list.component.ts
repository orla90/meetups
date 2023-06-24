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
  searchInput = '';
  meetups: Meetup[] = [];
  filteredMeetups: Meetup[] = [];
  currentPageMeetups: Meetup[] = [];
  pagination = new Pagination();

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.user &&
      this.meetupService.getMeetups().subscribe((data) => {
        this.meetups = data;
        this.filteredMeetups = data;
        this.setPaginationTotalCount();
        this.getCurrentPageMeetups();
        this.cdr.detectChanges();
      });
  }

  setPaginationTotalCount() {
    this.pagination.totalCount = this.filteredMeetups.length;
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.meetups.filter((meetup) =>
      meetup.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
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
