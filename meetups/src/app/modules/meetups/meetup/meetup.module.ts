import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupComponent } from './meetup.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [MeetupComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [MeetupComponent],
})
export class MeetupModule {}
