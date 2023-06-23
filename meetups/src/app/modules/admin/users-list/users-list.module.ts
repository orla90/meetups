import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UserFormModule } from '../user-form/user-form.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UserFormModule,
    RouterModule,
  ],
  exports: [
    UsersListComponent
  ]
})
export class UsersListModule { }
