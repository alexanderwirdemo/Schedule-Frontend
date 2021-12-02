import { TestBed } from '@angular/core/testing';

import { CanvasApiService } from './canvas-api.service';

describe('CanvasApiService', () => {
  let service: CanvasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
