import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BoardEffects } from './board.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: BoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(BoardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
