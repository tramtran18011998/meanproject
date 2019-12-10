import { TestBed } from '@angular/core/testing';

import { CthoadonService } from './cthoadon.service';

describe('CthoadonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CthoadonService = TestBed.get(CthoadonService);
    expect(service).toBeTruthy();
  });
});
