import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiviPrescriptionComponent } from './add-suivi-prescription.component';

describe('AddSuiviPrescriptionComponent', () => {
  let component: AddSuiviPrescriptionComponent;
  let fixture: ComponentFixture<AddSuiviPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuiviPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuiviPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
