import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormValidatorService } from './services/form-validator.service';
import { ApiInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    FormValidatorService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
