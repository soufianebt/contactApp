import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeContactsPage } from './liste-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ListeContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeContactsPageRoutingModule {}
