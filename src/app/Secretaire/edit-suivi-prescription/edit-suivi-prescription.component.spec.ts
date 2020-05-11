import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuiviPrescriptionComponent } from './edit-suivi-prescription.component';

describe('EditSuiviPrescriptionComponent', () => {
  let component: EditSuiviPrescriptionComponent;
  let fixture: ComponentFixture<EditSuiviPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuiviPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuiviPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
