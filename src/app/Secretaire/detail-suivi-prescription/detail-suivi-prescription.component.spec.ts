import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSuiviPrescriptionComponent } from './detail-suivi-prescription.component';

describe('DetailSuiviPrescriptionComponent', () => {
  let component: DetailSuiviPrescriptionComponent;
  let fixture: ComponentFixture<DetailSuiviPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSuiviPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSuiviPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
