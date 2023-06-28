import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMeetupsComponent } from './my-meetups.component';
import { MeetupModule } from '../meetup/meetup.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [MyMeetupsComponent],
  imports: [CommonModule, MeetupModule, SearchBarModule, PaginationModule],
  exports: [MyMeetupsComponent],
})
export class MyMeetupsModule {}
