import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentacionPage } from './presentacion';

@NgModule({
  declarations: [
    PresentacionPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentacionPage),
  ],
  exports:[
    PresentacionPage
  ]
})
export class PresentacionPageModule {}
