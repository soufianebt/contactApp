import {Component, OnInit} from '@angular/core';
import {ContactAuthService} from './services/contact-auth.service';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public clientEmail = 'soufiane@gmail.com' ;
  public appPages = [
    { title: 'Mes contacts', url: '/liste-contacts', icon: 'earth-outline' },
    { title: 'Recommendations', url: '/recommended-contacts', icon: 'checkmark-done-circle-outline' },
    { title: 'Profile', url: '/profile', icon: 'accessibility-outline' },
    { title: 'Favorite', url: '/favorite', icon: 'heart' },
    { title: 'Deconnexion', url: '/deconnexion', icon: 'backspace-outline' },
  ];
  constructor(private navCtrl: NavController,
              private fireAuth: ContactAuthService) {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(){
    this.fireAuth.userDetails().subscribe(res => {
      console.log('res', res);
      if(res !== null){
        this.clientEmail = res.email;
      }else {
        this.navCtrl.navigateForward('/authentification');
      }
    });
  }
}
