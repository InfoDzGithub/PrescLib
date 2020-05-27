import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSoinReelComponent } from './fiche-soin-reel.component';

describe('FicheSoinReelComponent', () => {
  let component: FicheSoinReelComponent;
  let fixture: ComponentFixture<FicheSoinReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheSoinReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSoinReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
