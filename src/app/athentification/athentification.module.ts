import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AthentificationPageRoutingModule } from './athentification-routing.module';

import { AthentificationPage } from './athentification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AthentificationPageRoutingModule
  ],
  declarations: [AthentificationPage]
})
export class AthentificationPageModule {}
