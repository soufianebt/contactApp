import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeconnexionPageRoutingModule } from './deconnexion-routing.module';

import { DeconnexionPage } from './deconnexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeconnexionPageRoutingModule
  ],
  declarations: [DeconnexionPage]
})
export class DeconnexionPageModule {}
