import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDepartmentsComponent } from './clinic-departments.component';

describe('ClinicDepartmentsComponent', () => {
  let component: ClinicDepartmentsComponent;
  let fixture: ComponentFixture<ClinicDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
