import { TestBed } from '@angular/core/testing';

import { NhanvienService } from './nhanvien.service';

describe('NhanvienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhanvienService = TestBed.get(NhanvienService);
    expect(service).toBeTruthy();
  });
});
