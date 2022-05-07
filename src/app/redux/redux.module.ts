import { TaskEffects } from './effects/task.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './reducers';
import { BoardEffects } from './effects/board.effects';
import { ColumnEffects } from './effects/column.effects';
import { UserEffects } from './effects/user.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      UserEffects,
      BoardEffects,
      ColumnEffects,
      TaskEffects,
    ]),
  ],
})
export class ReduxModule {}
