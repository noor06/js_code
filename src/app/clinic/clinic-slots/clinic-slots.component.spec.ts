import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSlotsComponent } from './clinic-slots.component';

describe('ClinicSlotsComponent', () => {
  let component: ClinicSlotsComponent;
  let fixture: ComponentFixture<ClinicSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
