import { TestBed } from '@angular/core/testing';

import { ScrolltopService } from './scrolltop.service';

describe('ScrolltopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrolltopService = TestBed.get(ScrolltopService);
    expect(service).toBeTruthy();
  });
});
