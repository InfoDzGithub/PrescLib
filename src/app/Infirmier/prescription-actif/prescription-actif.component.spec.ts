import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionActifComponent } from './prescription-actif.component';

describe('PrescriptionActifComponent', () => {
  let component: PrescriptionActifComponent;
  let fixture: ComponentFixture<PrescriptionActifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionActifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
