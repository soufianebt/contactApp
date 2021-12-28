import { Component, OnInit } from '@angular/core';
import {ContactAuthService} from '../services/contact-auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.page.html',
  styleUrls: ['./deconnexion.page.scss'],
})
export class DeconnexionPage implements OnInit {

  constructor(private fireauth: ContactAuthService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  singOut() {
    this.fireauth.singOut()
      .then(res =>{
        console.log('resresresres');
        this.navCtrl.navigateForward('/authentification');
      }, err =>{
        console.log(err);
      });
  }
}
