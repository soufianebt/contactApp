import { Component, OnInit } from '@angular/core';
import {ContactAcessService} from '../services/contact-acess.service';
import {Compte} from '../models/Compte';
import {ContactAuthService} from "../services/contact-auth.service";
import {NavController} from "@ionic/angular";

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
      }else{
        this.navCtrl.navigateForward('/authentification');
      }
    }, err =>{
      console.log('err', err);
    });
//
  console.log( this.contactsetvice.getCompte('soufiane@mail.com').subscribe(res => {
     this.compte= res as Compte;
     console.log(res);
    }));
  }

}
