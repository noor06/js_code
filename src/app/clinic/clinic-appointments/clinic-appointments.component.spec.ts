import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAppointmentsComponent } from './clinic-appointments.component';

describe('ClinicAppointmentsComponent', () => {
  let component: ClinicAppointmentsComponent;
  let fixture: ComponentFixture<ClinicAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
