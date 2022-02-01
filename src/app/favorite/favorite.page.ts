import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/Contact';
import {MenuController, NavController} from '@ionic/angular';

import {NavigationExtras} from '@angular/router';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  db: SQLiteObject;
  contacts: Contact[] = [];
  email: string;
  localImage= '../../../../assets/profile.png';
  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private sqlite: SQLite
              ) {
              this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.loadContact();
  }
  getImage(item): string{
    console.log(item);
    return item == null? this.localImage:item;
  }
  loadContact() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('select * from contact', [])
          .then((data) => {
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.contacts.push(new Contact(
                  data.rows.item(i).nom,
                  data.rows.item(i).prenom,
                  data.rows.item(i).email,
                  data.rows.item(i).tel,
                  data.rows.item(i).ville,
                  data.rows.item(i).adresse,
                  data.rows.item(i).service,
                  data.rows.item(i).imageUrl
              ));
          }}})
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    console.log(this.contacts);
  }
  detailsContact(email){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email,
        from:'favoris'
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }



}
