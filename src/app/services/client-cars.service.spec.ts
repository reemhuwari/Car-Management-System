import { TestBed } from '@angular/core/testing';

import { ClientCarsService } from './services/client-cars.service';

describe('ClientCarsService', () => {
  let service: ClientCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
