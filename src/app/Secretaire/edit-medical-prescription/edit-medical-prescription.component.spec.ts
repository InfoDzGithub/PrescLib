import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalPrescriptionComponent } from './edit-medical-prescription.component';

describe('EditMedicalPrescriptionComponent', () => {
  let component: EditMedicalPrescriptionComponent;
  let fixture: ComponentFixture<EditMedicalPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicalPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
