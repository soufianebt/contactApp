import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/Contact';
import {MenuController, NavController} from '@ionic/angular';
import {ContactAcessService} from '../services/contact-acess.service';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-recommended-contacts',
  templateUrl: './recommended-contacts.page.html',
  styleUrls: ['./recommended-contacts.page.scss'],
})
export class RecommendedContactsPage implements OnInit {
  contacts: Contact[];
  email: string;

  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private firestore: ContactAcessService) { }

  ngOnInit() {
    this.loadContact();
  }
  loadContact() {
    this.firestore.getAllContact().subscribe( data => {
      this.contacts = data.map(e => ({
        nom: e.payload.doc.data()['nom'],
        prenom: e.payload.doc.data()['prenom'],
        email: e.payload.doc.data()['email'],
        tel: e.payload.doc.data()['tel'],
        ville: e.payload.doc.data()['ville'],
        adresse: e.payload.doc.data()['adresse'],
        service: e.payload.doc.data()['service'],
      }));
      console.log(this.contacts);
    });
  }
  detailsContact(email: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email,
        from: 'liste-contacts-rec'
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }
}
