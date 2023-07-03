import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UserFormModule } from '../user-form/user-form.module';
import { RouterModule } from '@angular/router';
import { AddUserModule } from '../add-user/add-user.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UserFormModule,
    AddUserModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [UsersListComponent],
})
export class UsersListModule {}
