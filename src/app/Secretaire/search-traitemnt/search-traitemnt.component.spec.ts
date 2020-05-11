import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTraitemntComponent } from './search-traitemnt.component';

describe('SearchTraitemntComponent', () => {
  let component: SearchTraitemntComponent;
  let fixture: ComponentFixture<SearchTraitemntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTraitemntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTraitemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
