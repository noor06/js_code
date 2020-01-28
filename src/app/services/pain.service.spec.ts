/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PainService } from './pain.service';

describe('Service: Pain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PainService]
    });
  });

  it('should ...', inject([PainService], (service: PainService) => {
    expect(service).toBeTruthy();
  }));
});
