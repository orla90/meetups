import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupListComponent } from './meetup-list.component';

describe('MeetupListComponent', () => {
  let component: MeetupListComponent;
  let fixture: ComponentFixture<MeetupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupListComponent]
    });
    fixture = TestBed.createComponent(MeetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
