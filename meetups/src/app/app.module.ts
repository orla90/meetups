import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetupListModule } from './modules/meetup-list/meetup-list.module';
import { HeaderModule } from './modules/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './modules/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RegistrationModule } from './modules/registration/registration.module';
@NgModule({
  declarations: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MeetupListModule,
    HeaderModule,
    LoginModule,
    RegistrationModule
  ],
})
export class AppModule {}
