import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicNavbarComponent } from './clinic-navbar.component';

describe('ClinicNavbarComponent', () => {
  let component: ClinicNavbarComponent;
  let fixture: ComponentFixture<ClinicNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
