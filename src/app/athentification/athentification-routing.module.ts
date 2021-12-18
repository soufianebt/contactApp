import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthentificationPage } from './athentification.page';

const routes: Routes = [
  {
    path: '',
    component: AthentificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthentificationPageRoutingModule {}
