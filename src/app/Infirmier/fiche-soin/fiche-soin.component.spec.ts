import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSoinComponent } from './fiche-soin.component';

describe('FicheSoinComponent', () => {
  let component: FicheSoinComponent;
  let fixture: ComponentFixture<FicheSoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheSoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
