import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupListComponent } from './meetup-list.component';
import { MeetupModule } from '../meetup/meetup.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { PaginationModule } from '../pagination/pagination.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersModule } from '../filters/filters.module';
import { BnNgIdleService } from 'bn-ng-idle';
@NgModule({
  declarations: [MeetupListComponent],
  exports: [MeetupListComponent],
  providers: [
    BnNgIdleService,
  ],
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
