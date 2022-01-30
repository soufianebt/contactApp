import { Component, OnInit } from '@angular/core';
import {ContactAcessService} from '../services/contact-acess.service';
import {Contact} from '../models/Contact';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NavController} from '@ionic/angular';
import {ContactAuthService} from '../services/contact-auth.service';
import {Compte} from '../models/Compte';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  contacts: Contact[];
  inscriptionForm: FormGroup;
   compte: Compte;
   db: SQLiteObject;
  constructor(private fireAuth: ContactAuthService,
              private  firestore: ContactAcessService,
              private formBuilder: FormBuilder,
              private naveCntrl: NavController,
              private sqlite: SQLite) {
               console.log('inscription form init');
              this.inscriptionForm = this.formBuilder.group({
                nom: [''],
                prenom: [''],
                email: [''],
                tel: [''],
                password: [''],
            });
              this.createDB();
  }
  ngOnInit() {}

  createDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        // eslint-disable-next-line max-len
        this.db.executeSql('create table contact(nom VARCHAR(32), prenom VARCHAR(32),tel VARCHAR(32) primary key,' +
          ' email VARCHAR(32), adresse VARCHAR(32), ville VARCHAR(32), service VARCHAR(32))', [])
      .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  signUp(){
    console.log('signUp');
    this.fireAuth.singUp(this.inscriptionForm.value)
      .then(res => {
        console.log(res);
        this.firestore.newCompte(this.inscriptionForm.value);
        this.naveCntrl.navigateForward('/authentification');
      });
  }
}


