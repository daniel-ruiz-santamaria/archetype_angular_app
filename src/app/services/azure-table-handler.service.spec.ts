import { TestBed } from '@angular/core/testing';

import { AzureTableHandlerService } from './azure-table-handler.service';

describe('AzureTableHandlerService', () => {
  let service: AzureTableHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureTableHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
