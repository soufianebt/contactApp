import { Component, OnInit } from '@angular/core';
import {ContactAcessService} from '../services/contact-acess.service';
import {Contact} from '../models/Contact';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NavController} from '@ionic/angular';
import {ContactAuthService} from '../services/contact-auth.service';
import {Compte} from '../models/Compte';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  contacts: Contact[];
  inscriptionForm: FormGroup;
  compte = new Compte('','','','','','');
  db: SQLiteObject;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private fireAuth: ContactAuthService,
              private firestore: ContactAcessService,
              private naveCntrl: NavController,
              private sqlite: SQLite,
              private storage: AngularFireStorage
) {
                console.log('inscription form init');
                this.createDB();
  }
  ngOnInit() {}
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${new Date().getTime()}.png`;
    const ref = this.storage.ref(filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
      .subscribe();

  }
  createDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        // eslint-disable-next-line max-len
        this.db.executeSql('CREATE TABLE IF NOT EXISTS contact(nom VARCHAR(32), prenom VARCHAR(32),tel VARCHAR(32) primary key,' +
          ' email VARCHAR(32), adresse VARCHAR(32), ville VARCHAR(32), service VARCHAR(32), imageUrl VARCHAR(250))', [])
      .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  signUp(){
    console.log('signUp', this.compte);
    this.fireAuth.singUp(this.compte)
      .then(res => {
        console.log(res);
        this.firestore.newCompte(this.compte);
        this.naveCntrl.navigateForward('/authentification');
      });
  }
}


