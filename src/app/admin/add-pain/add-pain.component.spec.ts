/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPainComponent } from './add-pain.component';

describe('AddPainComponent', () => {
  let component: AddPainComponent;
  let fixture: ComponentFixture<AddPainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
