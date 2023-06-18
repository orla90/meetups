import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetupListModule } from './modules/meetup-list/meetup-list.module';
import { HeaderModule } from './modules/header/header.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MeetupListModule,
    HeaderModule,
  ],
})
export class AppModule {}
