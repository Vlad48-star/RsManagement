import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
// Не уверен что так стоит подключать кор модуль, но по другому достать из него хедер не получилось
import { BoardRoutingModule } from './board-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBoardPageComponent } from './pages/all-board-page/all-board-page.component';
import { ListComponent } from './components/list/list.component';
import { CrateBoardComponent } from './components/crate-board/crate-board.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardMenuComponent } from './components/board-menu/board-menu.component';
import { ColumnModule } from '../column/column.module';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AllBoardPageComponent,
    ListComponent,
    CrateBoardComponent,
    ListItemComponent,
    BoardPageComponent,
    BoardMenuComponent,
    EditComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BoardRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ColumnModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class BoardModule {}
