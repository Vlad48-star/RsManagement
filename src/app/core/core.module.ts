import { RequestsService } from './services/requests.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormValidatorService } from './services/form-validator.service';
import { ApiInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent, MainMenuComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    FormValidatorService,
    DataService,
    RequestsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  exports: [HeaderComponent, MainMenuComponent],
})
export class CoreModule {}
