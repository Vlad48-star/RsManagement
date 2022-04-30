import { BoardPageComponent } from './pages/board-page/board-page.component';
import { AllBoardPageComponent } from './pages/all-board-page/all-board-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'board', component: AllBoardPageComponent },
  {
    path: 'board/:id',
    component: BoardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
