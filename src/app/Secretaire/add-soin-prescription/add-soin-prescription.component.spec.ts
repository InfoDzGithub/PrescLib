import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoinPrescriptionComponent } from './add-soin-prescription.component';

describe('AddSoinPrescriptionComponent', () => {
  let component: AddSoinPrescriptionComponent;
  let fixture: ComponentFixture<AddSoinPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoinPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoinPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
