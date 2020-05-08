import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlimentPrescriptionComponent } from './add-aliment-prescription.component';

describe('AddAlimentPrescriptionComponent', () => {
  let component: AddAlimentPrescriptionComponent;
  let fixture: ComponentFixture<AddAlimentPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlimentPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlimentPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
