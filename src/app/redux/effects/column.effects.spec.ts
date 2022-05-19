import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ColumnEffects } from './column.effects';

describe('ColumnEffects', () => {
  let actions$: Observable<any>;
  let effects: ColumnEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColumnEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ColumnEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
