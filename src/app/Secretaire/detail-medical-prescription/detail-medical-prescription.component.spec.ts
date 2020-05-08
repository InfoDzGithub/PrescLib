import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMedicalPrescriptionComponent } from './detail-medical-prescription.component';

describe('DetailMedicalPrescriptionComponent', () => {
  let component: DetailMedicalPrescriptionComponent;
  let fixture: ComponentFixture<DetailMedicalPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMedicalPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMedicalPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
