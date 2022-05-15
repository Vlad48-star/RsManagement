import { RequestsService } from './services/requests.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormValidatorService } from './services/form-validator.service';
import { ApiInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    TogglerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
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
  exports: [HeaderComponent, FooterComponent, TogglerComponent],
})
export class CoreModule {}
