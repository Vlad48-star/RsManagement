import { TestBed } from '@angular/core/testing';

import { LangChangeService } from './lang-change.service';

describe('LangChangeService', () => {
  let service: LangChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
