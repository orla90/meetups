import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupFormComponent } from './meetup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MeetupFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MeetupFormComponent
  ]
})
export class MeetupFormModule { }
