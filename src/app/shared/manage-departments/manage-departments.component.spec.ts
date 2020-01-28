import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepartmentsComponent } from './manage-departments.component';

describe('ManageDepartmentsComponent', () => {
  let component: ManageDepartmentsComponent;
  let fixture: ComponentFixture<ManageDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
