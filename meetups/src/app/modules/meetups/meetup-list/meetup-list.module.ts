import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupListComponent } from './meetup-list.component';
import { MeetupModule } from '../meetup/meetup.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { PaginationModule } from '../pagination/pagination.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersModule } from '../filters/filters.module';
@NgModule({
  declarations: [MeetupListComponent],
  exports: [MeetupListComponent],
  imports: [
    CommonModule,
    MeetupModule,
    SearchBarModule,
    PaginationModule,
    MatProgressSpinnerModule,
    FiltersModule
  ],
})
export class MeetupListModule {}
