import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppointmentsComponent } from './manage-appointments.component';

describe('ManageAppointmentsComponent', () => {
  let component: ManageAppointmentsComponent;
  let fixture: ComponentFixture<ManageAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
