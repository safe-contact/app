import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from '../core/global-vars';
import { HealthState } from '../models/health-state.model';

@Injectable({providedIn: 'root'})
export class UserResource {
  constructor(private httpClient: HttpClient) {}

  createUser(deviceId: string): Promise<{id: string}> {
    return this.httpClient.post<{id: string}>(`${GlobalVars.hostname}/api/user`, {
      deviceId
    }).toPromise();
  }

  getUserHealthState(userId: string, deviceId: string, lang: string): Promise<HealthState> {
    const body = {userId, deviceId, lang};
    return this.httpClient.post<HealthState>(`${GlobalVars.hostname}/api/safe`, body).toPromise();
  }

  setSick(userId: string, deviceId: string, confirmed: boolean) {
    const body = {userId, deviceId};
    if (confirmed) {
      return this.httpClient.post(`${GlobalVars.hostname}/api/diagnostic`, body).toPromise();
    } else {
      return this.httpClient.post(`${GlobalVars.hostname}/api/symptom`, body).toPromise();
    }
  }

  setHealed(userId: string, deviceId: string) {
    const body = {userId, deviceId};
    return this.httpClient.post(`${GlobalVars.hostname}/api/recovered`, body).toPromise();
  }
}
