import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/Contact';
import {ContactAcessService} from '../services/contact-acess.service';
import {ContactAuthService} from '../services/contact-auth.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
              private socialSharing: SocialSharing) {
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
    } else {
      this.personel();
    }
  }

  personel() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.contactservice.getPersonalContact(res.email, this.emailContact).subscribe(res => {
          this.contact = res as Contact;
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
            console.log(res);
          });
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
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
      to: this.contact.email, subject: '[Rediger votre objet]]’, body: [Rediger votre message]',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GPS(): string {
    this.geolocation.getCurrentPosition().then((resp) => '(' + resp.coords.latitude + ',' + resp.coords.longitude + ')').catch((error) => {
      console.log('Error getting location', error);
      return ' ';
    });
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  SMS() {
    this.sms.send(this.contact.tel, '[Votre message ici!!!]');
  }

  sharing() {
    this.socialSharing.shareViaWhatsAppToPhone(this.contact.tel,
      this.GPS(), null).then(() => {
// Success!
    }).catch(() => {
// Error!
    });
  }
}
