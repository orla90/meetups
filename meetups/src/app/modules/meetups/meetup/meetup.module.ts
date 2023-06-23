import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupComponent } from './meetup.component';

@NgModule({
  declarations: [MeetupComponent],
  imports: [CommonModule],
  exports: [MeetupComponent],
})
export class MeetupModule {}
