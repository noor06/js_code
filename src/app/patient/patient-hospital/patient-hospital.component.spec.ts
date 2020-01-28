import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHospitalComponent } from './patient-hospital.component';

describe('PatientHospitalComponent', () => {
  let component: PatientHospitalComponent;
  let fixture: ComponentFixture<PatientHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
