import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesInfirmierActifComponent } from './fiches-infirmier-actif.component';

describe('FichesInfirmierActifComponent', () => {
  let component: FichesInfirmierActifComponent;
  let fixture: ComponentFixture<FichesInfirmierActifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichesInfirmierActifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichesInfirmierActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
