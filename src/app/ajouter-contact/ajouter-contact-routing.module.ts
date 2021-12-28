import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterContactPage } from './ajouter-contact.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterContactPageRoutingModule {}
