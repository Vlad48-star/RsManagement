import { RequestsService } from './services/requests.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormValidatorService } from './services/form-validator.service';
import { ApiInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SortByPipe } from './pipe/sort-by.pipe';
import { GlobalSearchComponent } from './components/global-search/global-search.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    TogglerComponent,
    SortByPipe,
    GlobalSearchComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [
    FormValidatorService,
    RequestsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TogglerComponent,
    SortByPipe,
    GlobalSearchComponent,
  ],
})
export class CoreModule {}
