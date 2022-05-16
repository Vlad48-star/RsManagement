import { BoardPageComponent } from './pages/board-page/board-page.component';
import { AllBoardPageComponent } from './pages/all-board-page/all-board-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './pages/main/main.component';

const editRout: Routes = [
  { path: 'edit', component: EditComponent}
];

const boardRout: Routes = [
  { path: 'board', component: AllBoardPageComponent}
];

const idBoard: Routes = [
  { path: 'board/:id', component: BoardPageComponent,}
];

const routes: Routes = [
  { path: 'main', component: MainComponent, children: editRout},
  { path: 'main', component: MainComponent, children: boardRout},
  { path: 'main', component: MainComponent, children: idBoard},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
