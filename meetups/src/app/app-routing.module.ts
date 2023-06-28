import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupListComponent } from './modules/meetups/meetup-list/meetup-list.component';
import { LoginComponent } from './modules/registration-and-login/login/login.component';
import { RegistrationComponent } from './modules/registration-and-login/registration/registration.component';
import { MeetupFormComponent } from './modules/meetups/meetup-form/meetup-form.component';
import { UsersListComponent } from './modules/admin/users-list/users-list.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { UserInfoComponent } from './modules/user-info/user-info.component';
import { MyMeetupsComponent } from './modules/meetups/my-meetups/my-meetups.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'home',
    component: MeetupListComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'All Meetups',
    },
  },
  {
    path: 'my-meetups',
    component: MyMeetupsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'My Meetups',
    },
  },
  {
    path: 'my-meetups',
    data: {
      breadcrumb: 'My Meetups',
    },
    children: [
      {
        path: 'create',
        component: MeetupFormComponent,
        data: {
          breadcrumb: 'Create Meetup',
        },
      },
    ],
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'My Data',
    },
  },
  { path: 'admin', component: UsersListComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
