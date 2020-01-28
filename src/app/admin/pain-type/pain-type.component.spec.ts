/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PainTypeComponent } from './pain-type.component';

describe('PainTypeComponent', () => {
  let component: PainTypeComponent;
  let fixture: ComponentFixture<PainTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
