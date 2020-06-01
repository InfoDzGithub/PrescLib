import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFileMDCLComponent } from './detail-file-mdcl.component';

describe('DetailFileMDCLComponent', () => {
  let component: DetailFileMDCLComponent;
  let fixture: ComponentFixture<DetailFileMDCLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFileMDCLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFileMDCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
