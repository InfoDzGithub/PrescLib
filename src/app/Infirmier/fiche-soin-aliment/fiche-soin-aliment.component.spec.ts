import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSoinAlimentComponent } from './fiche-soin-aliment.component';

describe('FicheSoinAlimentComponent', () => {
  let component: FicheSoinAlimentComponent;
  let fixture: ComponentFixture<FicheSoinAlimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheSoinAlimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSoinAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
