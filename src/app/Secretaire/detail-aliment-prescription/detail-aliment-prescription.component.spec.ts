import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlimentPrescriptionComponent } from './detail-aliment-prescription.component';

describe('DetailAlimentPrescriptionComponent', () => {
  let component: DetailAlimentPrescriptionComponent;
  let fixture: ComponentFixture<DetailAlimentPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAlimentPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAlimentPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
