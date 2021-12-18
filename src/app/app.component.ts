import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mes contacts', url: '/liste-contacts', icon: '' },
    { title: 'Recommendations', url: '/liste-contacts', icon: 'paper-plane' },
    { title: 'Profile', url: '/profil', icon: 'heart' },
        { title: 'inscriptiom', url: '/inscription', icon: 'heart' },
    { title: 'Deconnexion', url: '/authentification', icon: 'archive' },
  ];
  constructor() {}
}
