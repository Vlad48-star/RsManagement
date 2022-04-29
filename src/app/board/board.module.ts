import { HeaderComponent } from './../core/components/header/header.component';
import { BoardRoutingModule } from './board-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, RouterModule, BoardRoutingModule],
})
export class BoardModule {}
