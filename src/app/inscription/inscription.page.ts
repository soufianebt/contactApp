import { Component, OnInit } from '@angular/core';
import {ContactAcessService} from '../services/contact-acess.service';
import {Contact} from '../models/Contact';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NavController} from '@ionic/angular';
import {ContactAuthService} from '../services/contact-auth.service';
import {Compte} from '../models/Compte';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  contacts: Contact[];
  private inscriptionForm: FormGroup;
  private compte: Compte;
  constructor(private fireAuth: ContactAuthService,
              private  firestore: ContactAcessService,
              private formBuilder: FormBuilder,
              private naveCntrl: NavController) {
               console.log('inscription form init');
              this.inscriptionForm = this.formBuilder.group({
                nom: [''],
                prenom: [''],
                email: [''],
                tel: [''],
                password: [''],
            });
  }
  ngOnInit() {}
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


