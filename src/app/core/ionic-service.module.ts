import { NgModule } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@NgModule({
  providers: [
    AndroidPermissions,
    BackgroundMode,
    BluetoothLE,
    BluetoothSerial,
    Device,
    LocalNotifications
  ]
})
export class IonicServiceModule {}
