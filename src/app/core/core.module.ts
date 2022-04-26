import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormValidatorService } from './services/form-validator.service';
import { RouterModule } from '@angular/router';
import { ApiInterceptorService } from './services/app-interceptor.service';

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
})
export class CoreModule {}
