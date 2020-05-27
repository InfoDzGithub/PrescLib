import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSoinSuiviComponent } from './fiche-soin-suivi.component';

describe('FicheSoinSuiviComponent', () => {
  let component: FicheSoinSuiviComponent;
  let fixture: ComponentFixture<FicheSoinSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheSoinSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSoinSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
