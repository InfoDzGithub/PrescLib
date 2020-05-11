import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestSoinComponent } from './edit-test-soin.component';

describe('EditTestSoinComponent', () => {
  let component: EditTestSoinComponent;
  let fixture: ComponentFixture<EditTestSoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestSoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
