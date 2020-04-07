import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from '../core/global-vars';

@Injectable({providedIn: 'root'})
export class ScanResource {

  constructor(private httpClient: HttpClient) {}

  async meeted(userId: string, deviceId: string, meetings: Meeting[]) {
    try {
      const body = {
        userId,
        deviceId,
        meetings
      };

      return await this.httpClient.post(`${GlobalVars.hostname}/api/meeted`, body).toPromise();
    } catch (e) {
      return null;
    }
  }
}
