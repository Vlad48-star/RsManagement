import { CoreModule } from './../core/core.module';
// Не уверен что так стоит подключать кор модуль, но по другому достать из него хедер не получилось
import { BoardRoutingModule } from './board-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, RouterModule, BoardRoutingModule, CoreModule],
})
export class BoardModule {}
