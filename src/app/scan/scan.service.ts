import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { timer } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { differenceBy } from 'lodash';
import { ScanResource } from './scan.resource';
import { UUIDService } from '../core/uuid.service';

@Injectable({providedIn: 'root'})
export class ScanService {

  meetedUsers = [];
  pushInterval = 1 * 60 * 1000;

  constructor(private uuidService: UUIDService, private scanResource: ScanResource) {
    this.pushToServer();
  }

  meetUser(meetedUserId: string, rssi: number) {
    this.meetedUsers.push(new Meeting({
      meetedUserId,
      rssi,
      meetingDate: new Date()
    }));
  }

  async pushToServer() {
    const userId = this.uuidService.getUserID();
    const deviceId = await this.uuidService.getDeviceId();

    let meetingsToSave: Meeting[];

    timer(0, this.pushInterval)
      .pipe(
        tap(() => meetingsToSave = this.meetedUsers),
        filter(() => this.meetedUsers ? this.meetedUsers.length > 0 : false),
        switchMap(() => this.scanResource.meeted(userId, deviceId, this.meetedUsers))
      )
      .subscribe(result => {
        if (result) {
          this.meetedUsers = differenceBy(this.meetedUsers, meetingsToSave);
        }
      });
  }
}
