import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoinPrescriptionComponent } from './edit-soin-prescription.component';

describe('EditSoinPrescriptionComponent', () => {
  let component: EditSoinPrescriptionComponent;
  let fixture: ComponentFixture<EditSoinPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSoinPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoinPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
