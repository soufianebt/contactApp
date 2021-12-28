import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedContactsPage } from './recommended-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedContactsPageRoutingModule {}
