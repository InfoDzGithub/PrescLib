import { TestBed } from '@angular/core/testing';

import { CareFileService } from './care-file.service';

describe('CareFileService', () => {
  let service: CareFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
