import { TestBed } from '@angular/core/testing';

import { KhachhangService } from './khachhang.service';

describe('KhachhangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KhachhangService = TestBed.get(KhachhangService);
    expect(service).toBeTruthy();
  });
});
