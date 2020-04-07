import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { ScanModule } from './scan/scan.module';
import { HomeModule } from './home/home.module';
import { HealthStateModule } from './health-state/health-state.module';
import { CoreModule } from './core/translate/core.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//import { BackgroundMode } from '@ionic-native/background-mode';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CoreModule,
    CommonModule,
    IonicModule,
    TranslateModule,
    HttpClientModule,
    HealthStateModule,
    ScanModule,
    HomeModule,
   // BackgroundMode
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    // Définition de la langue
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}
