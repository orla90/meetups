import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupListComponent } from './meetup-list.component';
import { MeetupModule } from "../meetup/meetup.module";
import { SearchBarModule } from "../search-bar/search-bar.module";


@NgModule({
    declarations: [
        MeetupListComponent
    ],
    exports: [
        MeetupListComponent
    ],
    imports: [
        CommonModule,
        MeetupModule,
        SearchBarModule
    ]
})
export class MeetupListModule { }
