import { Component, OnInit } from '@angular/core';
import {ContactAcessService} from '../services/contact-acess.service';
import {Compte} from '../models/Compte';
import {ContactAuthService} from '../services/contact-auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: string;
  compte: Compte;
  email: string;

  constructor(private contactsetvice: ContactAcessService,
              private fireauth: ContactAuthService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.fireauth.userDetails().subscribe(res=> {
      console.log('res',res);
      if(res !== null){
        this.email = res.email;
        console.log('user is on', this.email);
        this.contactsetvice.getCompte(this.email).subscribe(compte => {
          console.log('Get compte for user ', res);
          this.compte = compte as Compte;
        });

      }else{
        this.navCtrl.navigateForward('/authentification');
      }
    }, err =>{
      console.log('err', err);
    });

  }

}
