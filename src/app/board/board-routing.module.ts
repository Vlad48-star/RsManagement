import { CrateBoardComponent } from './components/crate-board/crate-board.component';
import { ListComponent } from './components/list/list.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const itemRoutes: Routes = [
  { path: '', component: ListComponent, outlet: 'border-content' },
  {
    path: 'n',
    component: CrateBoardComponent,
    outlet: 'border-content',
  },
];
const routes: Routes = [
  { path: 'board', component: BoardPageComponent, children: itemRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
