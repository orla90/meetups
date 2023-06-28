import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetupListModule } from './modules/meetups/meetup-list/meetup-list.module';
import { HeaderModule } from './modules/header/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './modules/registration-and-login/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RegistrationModule } from './modules/registration-and-login/registration/registration.module';
import { MeetupFormModule } from './modules/meetups/meetup-form/meetup-form.module';
import { PaginationModule } from './modules/meetups/pagination/pagination.module';
import { UsersListModule } from './modules/admin/users-list/users-list.module';
import { UserFormModule } from './modules/admin/user-form/user-form.module';
import { AddUserModule } from './modules/admin/add-user/add-user.module';
import { UserInfoModule } from './modules/user-info/user-info.module';
import { DialogWindowModule } from './modules/dialog-window/dialog-window.module';
import { MyMeetupsModule } from './modules/meetups/my-meetups/my-meetups.module';
@NgModule({
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HeaderModule,
    LoginModule,
    RegistrationModule,
    MeetupFormModule,
    PaginationModule,
    UserFormModule,
    UsersListModule,
    AddUserModule,
    UserInfoModule,
    DialogWindowModule,
    MyMeetupsModule,
  ],
})
export class AppModule {}
