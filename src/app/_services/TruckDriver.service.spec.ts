/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TruckDriverService } from './TruckDriver.service';

describe('Service: TruckDriver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruckDriverService]
    });
  });

  it('should ...', inject([TruckDriverService], (service: TruckDriverService) => {
    expect(service).toBeTruthy();
  }));
});
