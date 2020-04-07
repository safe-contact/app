import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import sha256 from 'crypto-js/sha256';

/**
 * Service to get home id and device id
 */
@Injectable({providedIn: 'root'})
export class UUIDService {
  static readonly USER_ID_KEY = 'user_uuid';
  static readonly DEVICE_ID_KEY = 'device_uuid';

  constructor(private device: Device) {}

  getUserID(): string {
    return localStorage.getItem(UUIDService.USER_ID_KEY);
  }

  setUserID(uuid: string) {
    localStorage.setItem(UUIDService.USER_ID_KEY, uuid);
  }

  /**
   * Return the device id.
   * The device id should be detected by others during the bluetooth scan
   */
  getDeviceId() {
      return sha256(this.device.uuid).toString();
  }
}
