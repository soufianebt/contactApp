import { Component, OnInit } from '@angular/core';
import {ContactAuthService} from '../services/contact-auth.service';
import {ContactAcessService} from '../services/contact-acess.service';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {finalize, tap} from 'rxjs/operators';
import {Contact} from '../models/Contact';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {
  contact: Contact = new Contact('',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '');
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private fireauth: ContactAuthService,
              private firestore: ContactAcessService,
              private navCtrl: NavController,
              private storage: AngularFireStorage
) {}
  ngOnInit() {
  }
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
  nouveauContact(){
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.firestore.newPersonalContact(res.email ,this.contact);
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
}
