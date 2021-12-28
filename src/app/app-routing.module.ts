import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentification',
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
    path: 'deconnexion',
    loadChildren: () => import('./deconnexion/deconnexion.module').then( m => m.DeconnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'recommended-contacts',
    loadChildren: () => import('./recommended-contacts/recommended-contacts.module').then( m => m.RecommendedContactsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
