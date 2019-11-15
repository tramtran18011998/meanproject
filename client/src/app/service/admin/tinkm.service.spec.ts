import { TestBed } from '@angular/core/testing';

import { TinkmService } from './tinkm.service';

describe('TinkmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TinkmService = TestBed.get(TinkmService);
    expect(service).toBeTruthy();
  });
});
