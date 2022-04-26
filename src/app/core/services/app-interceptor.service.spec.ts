import { TestBed } from '@angular/core/testing';

import { AppInterceptorService } from './app-interceptor.service';

describe('AppInterceptorService', () => {
  let service: AppInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
