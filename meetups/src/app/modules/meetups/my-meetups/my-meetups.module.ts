import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMeetupsComponent } from './my-meetups.component';
import { MeetupModule } from '../meetup/meetup.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { PaginationModule } from '../pagination/pagination.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersModule } from '../filters/filters.module';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [MyMeetupsComponent],
  imports: [
    CommonModule,
    MeetupModule,
    SearchBarModule,
    PaginationModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    FiltersModule,
    BreadcrumbModule
  ],
  exports: [MyMeetupsComponent],
})
export class MyMeetupsModule {}
