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
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'home',
      },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: {
        label: 'Login',
        info: 'exit_to_app',
      },
    },
  },
  { path: 'register', component: RegistrationComponent, data: {
    breadcrumb: {
      label: 'Register',
      info: 'account_circle',
    },
  }, },
  {
    path: 'meetups',
    component: MeetupListComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: {
        label: 'All Meetups',
        info: 'group',
      },
    },
  },
  {
    path: 'my-meetups',
    component: MyMeetupsComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: {
        label: 'My Meetups',
        info: 'group',
      },
    },
  },
  {
    path: 'my-meetups',
    data: {
      breadcrumb: {
        label: 'My Meetups',
        info: 'group',
      },
    },
    children: [
      {
        path: 'create',
        component: MeetupFormComponent,
        data: {
          breadcrumb: {
            label: 'Create Meetup',
            info: 'group_add',
          },
        },
      },
      {
        path: 'edit/:id',
        component: MeetupFormComponent,
        data: {
          breadcrumb: {
            label: 'Edit Meetup',
            info: 'edit',
          },
        },
      },
    ],
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: {
        label: 'My Data',
        info: 'settings',
      },
    },
  },
  {
    path: 'admin',
    component: UsersListComponent,
    canActivate: [adminGuard, authGuard],
    data: {
      breadcrumb: {
        label: 'Admin',
        info: 'person_add',
      },
    },
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
