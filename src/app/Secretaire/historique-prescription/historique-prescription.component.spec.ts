import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePrescriptionComponent } from './historique-prescription.component';

describe('HistoriquePrescriptionComponent', () => {
  let component: HistoriquePrescriptionComponent;
  let fixture: ComponentFixture<HistoriquePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
