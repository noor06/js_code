/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPainComponent } from './edit-pain.component';

describe('EditPainComponent', () => {
  let component: EditPainComponent;
  let fixture: ComponentFixture<EditPainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
