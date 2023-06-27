import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UserInfoComponent
  ]
})
export class UserInfoModule { }
