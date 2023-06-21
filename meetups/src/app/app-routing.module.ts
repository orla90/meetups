import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupListComponent } from './modules/meetup-list/meetup-list.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { MeetupFormComponent } from './modules/meetup-form/meetup-form.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', component: MeetupListComponent },
  { path: 'create', component: MeetupFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
