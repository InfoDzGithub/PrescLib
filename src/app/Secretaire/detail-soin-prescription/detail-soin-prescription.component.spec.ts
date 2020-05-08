import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSoinPrescriptionComponent } from './detail-soin-prescription.component';

describe('DetailSoinPrescriptionComponent', () => {
  let component: DetailSoinPrescriptionComponent;
  let fixture: ComponentFixture<DetailSoinPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSoinPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSoinPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
