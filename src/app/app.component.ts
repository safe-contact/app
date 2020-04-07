import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UUIDService } from './core/uuid.service';
import { HealthStateService } from './health-state/health-state.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  needRegistration = true;
  initialized = false;

  constructor(
    private backgroundMode: BackgroundMode,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uuidService: UUIDService,
    private healthStateService: HealthStateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initialized = true;
      this.needRegistration = !this.uuidService.getUserID();
      if (this.platform.is('ios')) {
        this.backgroundMode.enable();
      }
    });
  }

  async refreshState(event) {
    try {
      await this.healthStateService.getHealthState();
    } catch (a) {}
    await event.target.complete();
  }
}
