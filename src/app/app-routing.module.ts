import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'liste-contacts',
    pathMatch: 'full'
  },
  {
    path: 'liste-contacts',
    loadChildren: () => import('./liste-contacts/liste-contacts.module').then( m => m.ListeContactsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ajouter-contact',
    loadChildren: () => import('./ajouter-contact/ajouter-contact.module').then( m => m.AjouterContactPageModule)
  },
  {
    path: 'detail-contact',
    loadChildren: () => import('./detail-contact/detail-contact.module').then( m => m.DetailContactPageModule)
  },
  {
    path: 'athentification',
    loadChildren: () => import('./athentification/athentification.module').then( m => m.AthentificationPageModule)
  },
  {
    path: 'deconnexion',
    loadChildren: () => import('./deconnexion/deconnexion.module').then( m => m.DeconnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
