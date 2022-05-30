import { TestBed } from '@angular/core/testing';

import { InferenceServiceService } from './inference-service.service';

describe('InferenceServiceService', () => {
  let service: InferenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InferenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
