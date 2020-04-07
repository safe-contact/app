import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthStateService } from './health-state.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HealthState } from '../models/health-state.model';

@Component({
  selector: 'mv-health-state',
  templateUrl: 'health-state.component.html',
  styleUrls: ['health-state.component.scss']
})
export class HealthStateComponent implements OnInit {
  healthState$: Observable<any>;

  probablyButton = {
    text: this.translateService.instant('healthstate.buttons.probably'),
    icon: 'battery-half-outline',
    handler: () => this.sick(false)
  };
  diagnosticButton = {
    text: this.translateService.instant('healthstate.buttons.confirmed'),
    icon: 'battery-dead-outline',
    handler: () => this.sick(true)
  };

  healedButtons = [
    {
      text: this.translateService.instant('healthstate.buttons.healed'),
      icon: 'battery-charging-outline',
      handler: () => {}
    }
  ];

  constructor(private healthStateService: HealthStateService,
              private translateService: TranslateService,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController
            ) {}

  ngOnInit() {
    this.healthState$ = this.healthStateService.healthState$;
  }

  async showButtons(healthState: HealthState) {
    let buttons;

    if (healthState && healthState.hasSymptom) {
      buttons = [this.diagnosticButton, this.healedButtons];
    } else if (healthState && healthState.isDiagnotic) {
      buttons = [this.healedButtons];
    } else {
      buttons = [this.probablyButton, this.diagnosticButton];
    }

    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('healthstate.warn'),
      buttons: [
        ... buttons,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  sick(confirmed: boolean) {
    try {
      this.sickAlertConfirm(confirmed);
    } catch ($e) {
      this.alertSick(this.translateService.instant('healthstate.sick.error'),
                         this.translateService.instant('healthstate.sick.error_message'));
    }
  }

  healed() {
    try {
      this.healedAlertConfirm();
    } catch ($e) {
      this.alertSick(this.translateService.instant('healthstate.sick.error'),
        this.translateService.instant('healthstate.sick.error_message'));
    }
  }

  async sickAlertConfirm(confirmed: boolean) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('healthstate.sick.warning'),
      message: this.translateService.instant(`healthstate.sick.explication.${confirmed ? 'confirmed' : 'notConfirmed'}`),
      buttons: [
        {
          text: this.translateService.instant('app.no'),
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: this.translateService.instant('app.yes'),
          handler: () => this.sendSick(confirmed)
        }
      ]
    });
    await alert.present();
  }


  async healedAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('healthstate.healed.warning'),
      message: this.translateService.instant(`healthstate.healed.explication`),
      buttons: [
        {
          text: this.translateService.instant('app.no'),
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: this.translateService.instant('app.yes'),
          handler: () => this.sendHealed()
        }
      ]
    });
    await alert.present();
  }

  sendSick(confirmed: boolean) {
    this.healthStateService.setSick(confirmed);
    this.alertSick(
      this.translateService.instant('healthstate.sick.success'),
      this.translateService.instant('healthstate.sick.success_message')
    );
  }

  sendHealed() {
    this.healthStateService.setHealed();
    this.alertSick(
      this.translateService.instant('healthstate.healed.success'),
      this.translateService.instant('healthstate.healed.success_message')
    );
  }

  async alertSick(messageHeader: string, messageBody: string) {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: messageBody,
      buttons: ['OK']
    });

    await alert.present();
  }
}
