import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHospitalsComponent } from './patient-hospitals.component';

describe('PatientHospitalsComponent', () => {
  let component: PatientHospitalsComponent;
  let fixture: ComponentFixture<PatientHospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
