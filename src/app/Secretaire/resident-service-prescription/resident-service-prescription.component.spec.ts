import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentServicePrescriptionComponent } from './resident-service-prescription.component';

describe('ResidentServicePrescriptionComponent', () => {
  let component: ResidentServicePrescriptionComponent;
  let fixture: ComponentFixture<ResidentServicePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentServicePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentServicePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
