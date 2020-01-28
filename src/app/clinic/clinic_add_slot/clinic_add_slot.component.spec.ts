/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Clinic_add_slotComponent } from './clinic_add_slot.component';

describe('Clinic_add_slotComponent', () => {
  let component: Clinic_add_slotComponent;
  let fixture: ComponentFixture<Clinic_add_slotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clinic_add_slotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clinic_add_slotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
