import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mes contacts', url: '/liste-contacts', icon: '' },
    { title: 'Recommendations', url: '/recommended-contacts', icon: 'paper-plane' },
    { title: 'Profile', url: '/profile', icon: 'heart' },
    { title: 'Deconnexion', url: '/deconnexion', icon: 'archive' },
  ];
  constructor() {}
}
