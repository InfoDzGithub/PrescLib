import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSByPrescComponent } from './dossier-sby-presc.component';

describe('DossierSByPrescComponent', () => {
  let component: DossierSByPrescComponent;
  let fixture: ComponentFixture<DossierSByPrescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierSByPrescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierSByPrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
