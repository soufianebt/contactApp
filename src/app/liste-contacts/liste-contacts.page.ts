import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {Contact} from '../models/Contact';
import {NavigationExtras} from '@angular/router';
import {ContactAcessService} from '../services/contact-acess.service';
import {ContactAuthService} from '../services/contact-auth.service';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  contacts: Contact[];
  email: string;

  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private firestore: ContactAcessService,
              private fireAuth: ContactAuthService) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.fireAuth.userDetails().subscribe(res => {
      console.log('res', res);
      if(res !== null){
        this.email = res.email;
        this.loadContact();
      }else {
        this.navCtrl.navigateForward('/authentification');
      }
    });
    console.log(this.contacts);
  }
   loadContact() {
    this.firestore.getAllPersonalContact(this?.email).subscribe(data => {
      this.contacts = data.map(e => ({
        nom: e.payload.doc.data().nom,
        prenom: e.payload.doc.data().prenom,
        email: e.payload.doc.data().email,
        tel: e.payload.doc.data().tel,
        ville: e.payload.doc.data().ville,
        adresse: e.payload.doc.data().adresse,
        service: e.payload.doc.data().service,
      }));
    });
  }
  detailsContact(email){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email,
        from:"liste-contacts"
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }

ajouterContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
  }

}
