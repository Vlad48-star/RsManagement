import { BoardGuard } from './../board/board.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [BoardGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [BoardGuard] },
  { path: '', component: PreviewPageComponent, canActivate: [BoardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
