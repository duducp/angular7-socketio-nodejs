import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetActionsComponent } from './pages/set-actions/set-actions.component';
import { ViewActionsComponent } from './pages/view-actions/view-actions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewActionsComponent
  }, {
    path: ':id',
    component: SetActionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
