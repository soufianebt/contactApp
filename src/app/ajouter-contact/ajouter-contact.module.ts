import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterContactPageRoutingModule } from './ajouter-contact-routing.module';

import { AjouterContactPage } from './ajouter-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterContactPageRoutingModule
  ],
  declarations: [AjouterContactPage]
})
export class AjouterContactPageModule {}
