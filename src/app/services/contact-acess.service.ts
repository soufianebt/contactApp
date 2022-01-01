import { Injectable } from '@angular/core';
import {Contact} from '../models/Contact';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactAcessService {

  constructor(private firestore: AngularFirestore) { }
  getCompte(id: string){
    return this.firestore.doc('/Comptes/'+id).valueChanges();
  }
  getContact(id: string){
    return this.firestore.doc('/Contacts/'+id).valueChanges();
  }
  getAllCompte(){
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }
  getAllContact() {
    return this.firestore.collection('/Contacts/').snapshotChanges();
  }

  getPersonalContact(id1: string, id2: string ) {
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).valueChanges();
  }
  getAllPersonalContact(id: string){
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts/').snapshotChanges();
  }
   newCompte(compte){
    console.log('trying to insert compte', compte);
    return this.firestore.collection('/Comptes/').doc(compte.email).set(JSON.parse(JSON.stringify(compte)));
  }
  newContact(contact){
    return this.firestore.collection('/Contacts/').doc(contact.email).set(JSON.parse(JSON.stringify(contact)));
  }
  newPersonalContact(id: string, contact: Contact ){
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts/').doc(contact.email).set(JSON.parse(JSON.stringify(contact)));
  }

  delateContactPersonel(id1: string, id2: string ){
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).delete();
  }

  setPersonalContact(id1: string, id2: string, contact: Contact) {
    this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).delete();
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(contact.email).set(contact);
  }
}

