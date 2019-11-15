import { TestBed } from '@angular/core/testing';

import { LoaispService } from './loaisp.service';

describe('LoaispService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaispService = TestBed.get(LoaispService);
    expect(service).toBeTruthy();
  });
});
