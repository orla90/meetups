import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UserFormModule } from '../user-form/user-form.module';
import { RouterModule } from '@angular/router';
import { AddUserModule } from '../add-user/add-user.module';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UserFormModule, AddUserModule, RouterModule],
  exports: [UsersListComponent],
})
export class UsersListModule {}
