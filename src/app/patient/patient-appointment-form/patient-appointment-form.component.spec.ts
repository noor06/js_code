import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentFormComponent } from './patient-appointment-form.component';

describe('PatientAppointmentFormComponent', () => {
  let component: PatientAppointmentFormComponent;
  let fixture: ComponentFixture<PatientAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAppointmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
