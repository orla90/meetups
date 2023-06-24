import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupListComponent } from './modules/meetups/meetup-list/meetup-list.component';
import { LoginComponent } from './modules/registration-and-login/login/login.component';
import { RegistrationComponent } from './modules/registration-and-login/registration/registration.component';
import { MeetupFormComponent } from './modules/meetups/meetup-form/meetup-form.component';
import { UsersListComponent } from './modules/admin/users-list/users-list.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', component: MeetupListComponent, canActivate: [authGuard] },
  { path: 'my-meetups', component: MeetupListComponent, canActivate: [authGuard] },
  { path: 'create', component: MeetupFormComponent },
  { path: 'admin', component: UsersListComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
