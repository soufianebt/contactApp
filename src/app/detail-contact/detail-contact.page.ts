import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/Contact';
import {ContactAcessService} from '../services/contact-acess.service';
import {ContactAuthService} from '../services/contact-auth.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {CallNumber} from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  emailContact: string;
  from: string;
  contact: Contact;
  isButtonsVisible = false;
  modified: boolean;
  inscriptionForm: FormGroup;
  LocationUrl: string;
  start_icon_type = 'star-outline';
  db: SQLiteObject;

  constructor(private contactservice: ContactAcessService,
              private fireauth: ContactAuthService,
              private firestore: ContactAcessService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private callNumber: CallNumber,
              private emailComposer: EmailComposer,
              private geolocation: Geolocation,
              private router: Router,
              private sms: SMS,
              private socialSharing: SocialSharing,
              private formBuilder: FormBuilder,
              private sqlite: SQLite) {
            this.route.queryParams.subscribe(params => {
              this.emailContact = params.emailContact;
              this.from = params.from;
              if (this.from === 'liste-contacts-rec') {
                this.isButtonsVisible = false;
              } else {
                this.isButtonsVisible = true;
              }
    });


  }

  ngOnInit() {
       if (this.from === 'liste-contacts-rec') {
         this.recommande();
       } else if(this.from === 'liste-contacts'){
         this.personel();
         this.modified = true;
       }else if(this.from === 'favoris'){
         this.favori();
       }
   }

  personel() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.contactservice.getPersonalContact(res.email, this.emailContact).subscribe(res => {
          this.contact = res as Contact;
          //verifie if the contact in the liste of favorites with an SQL Request
          this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
              this.db = db;
              this.db.executeSql('select * from contact where tel="'+this.contact.tel+'"',[])
                .then((data) => {
                  if(data.rows.length > 0){
                    this.start_icon_type= 'star';
                  }else {
                    this.start_icon_type = 'star-outline';
                  }
                })
                .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
          console.log(res);
        });
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }

  recommande() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.getContact(this.emailContact).subscribe
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (res => {
            this.contact = res as Contact;
            //verifie if the contact in the liste of favorites with an SQL Request
            this.sqlite.create({
              name: 'data.db',
              location: 'default'
            })
              .then((db: SQLiteObject) => {
                this.db = db;
                this.db.executeSql('select * from contact where tel="'+this.contact.tel+'"',[])
                  .then((data) => {
                    if(data.rows.length > 0){
                      this.start_icon_type= 'star';
                    }else {
                      this.start_icon_type = 'star-outline';
                    }
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
            console.log(res);
          });
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }

  modifier(){
    this.modified = false;
  }
  supprimer() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.delateContactPersonel(res.email, this.contact.email);
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }

  partager() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.firestore.newContact(this.contact);
        this.navCtrl.navigateForward('/recommended-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }

  appel() {
    this.callNumber.callNumber(this.contact.tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  email() {
    const email = {
      to: this.contact.email, subject: 'Demmand de service',
      body: 'How are you? Nice greetings from Rabat' ,
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GPS(): string{
    this.geolocation.getCurrentPosition().then((resp) => {
      this.LocationUrl =  resp.coords.latitude.toString() + ',' + resp.coords.longitude.toString();
      //
      console.log(this.LocationUrl);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    console.log(this.LocationUrl);
  return 'https://www.google.com/maps/@'+this.LocationUrl;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention

  setSMS() {
    this.sms.send(this.contact.tel, '[Votre message ici!!!]');
  }

  sharing() {
    this.socialSharing.shareViaWhatsAppToReceiver(this.contact.tel,
      'Hi You can find me \n' + this.GPS(), null).then(() => {
// Success!
    }).catch(() => {
// Error!
    });
  }

  save(){
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.contactservice.setPersonalContact(res.email, this.emailContact, this.contact);

        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
    console.log(this.contact);
  }

  ajouterFavori() {
  if(this.start_icon_type == 'start'){
    this.start_icon_type = 'star-outline';
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('delete from contact where tel="'+this.contact.tel+'"',[])
          .then(() => console.log('Executed SQL delete'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }else {
    this.start_icon_type = 'star';
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('insert into contact(nom, prenom, tel, email, adresse, ville, service) values("'
          +this.contact.nom+'","'
          +this.contact.prenom+'","'
          +this.contact.tel+'","'
          +this.contact.email+'","'
          +this.contact.adresse+'","'
          +this.contact.ville+'","'
          +this.contact.service+'")',[])
          .then(() => console.log('Executed SQL insert'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  }

  favori(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('select * from contact where email="'+this.emailContact+'"',[])
        .then((data) => {this.contact = data.row.item(0);})
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
      this.start_icon_type= 'star';
  }

}
