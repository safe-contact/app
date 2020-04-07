import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateModule } from './translate.module';
import { IonicServiceModule } from '../ionic-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicServiceModule,
    TranslateModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ]

})
export class CoreModule {}
