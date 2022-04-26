import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
// import { PreviewPageComponent } from './preview-page/preview-page.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [RegistrationComponent, LoginComponent, PreviewPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AuthModule {}
