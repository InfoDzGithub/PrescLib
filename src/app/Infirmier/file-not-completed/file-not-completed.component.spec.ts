import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNotCompletedComponent } from './file-not-completed.component';

describe('FileNotCompletedComponent', () => {
  let component: FileNotCompletedComponent;
  let fixture: ComponentFixture<FileNotCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNotCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNotCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
