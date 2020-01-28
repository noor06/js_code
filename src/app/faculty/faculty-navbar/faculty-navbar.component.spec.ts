import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyNavbarComponent } from './faculty-navbar.component';

describe('FacultyNavbarComponent', () => {
  let component: FacultyNavbarComponent;
  let fixture: ComponentFixture<FacultyNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
