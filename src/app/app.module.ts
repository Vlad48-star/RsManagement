import { ReduxModule } from './redux/redux.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    ReduxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
