import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Meetup } from 'src/app/classes/meetup';
import { Pagination } from 'src/app/classes/pagination';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.meetupService.getMeetups().subscribe((data) => {
      this.meetups = data;
      this.filteredMeetups = data;
      this.pagination.totalCount = data.length;
      this.getCurrentPageMeetups();
      this.cdr.detectChanges();
    });
  }

  searchMeetups(searchInput: string) {
    this.filteredMeetups = this.filteredMeetups.filter((meetup) =>
      meetup.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
  }

  onPaginationChange(pagination: Pagination): void {
    this.pagination = pagination;
    this.getCurrentPageMeetups();
  }

  getCurrentPageMeetups(): void {
    const currentPage = this.pagination.currentPage;
    const pageSize = this.pagination.pageSize;
    this.currentPageMeetups = this.filteredMeetups.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    );
  }
}
