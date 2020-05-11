import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlimentPrescriptionComponent } from './edit-aliment-prescription.component';

describe('EditAlimentPrescriptionComponent', () => {
  let component: EditAlimentPrescriptionComponent;
  let fixture: ComponentFixture<EditAlimentPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlimentPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlimentPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
