import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupListComponent } from './meetup-list.component';
import { MeetupModule } from "../meetup/meetup.module";



@NgModule({
    declarations: [
        MeetupListComponent
    ],
    imports: [
        CommonModule,
        MeetupModule
    ],
    exports: [
        MeetupListComponent
    ]
})
export class MeetupListModule { }
