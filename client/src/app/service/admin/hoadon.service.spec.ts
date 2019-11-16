import { TestBed } from '@angular/core/testing';

import { HoadonService } from './hoadon.service';

describe('HoadonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoadonService = TestBed.get(HoadonService);
    expect(service).toBeTruthy();
  });
});
