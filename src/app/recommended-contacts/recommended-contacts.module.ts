import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedContactsPageRoutingModule } from './recommended-contacts-routing.module';

import { RecommendedContactsPage } from './recommended-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedContactsPageRoutingModule
  ],
  declarations: [RecommendedContactsPage]
})
export class RecommendedContactsPageModule {}
