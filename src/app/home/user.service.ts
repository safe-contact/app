import { Injectable } from '@angular/core';
import { UUIDService } from '../core/uuid.service';
import { UserResource } from './user.resource';
import { TranslateService } from '@ngx-translate/core';
import { HealthState } from '../models/health-state.model';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private userRessource: UserResource,
    private uuidService: UUIDService,
    private translateService: TranslateService) {
  }

  async createUser() {
    const deviceId = await this.uuidService.getDeviceId();
    const {id} = await this.userRessource.createUser(deviceId);
    this.uuidService.setUserID(id);
  }


  async getUserHealthState(): Promise<HealthState> {
    const lang = this.translateService.currentLang;
    try {
      return await this.userRessource.getUserHealthState(this.uuidService.getUserID(), await this.uuidService.getDeviceId(), lang);
    } catch (e) {
      return null;
    }
  }

  async setSick(confirmed: boolean) {
      return await this.userRessource.setSick(this.uuidService.getUserID(), await this.uuidService.getDeviceId(), confirmed);
  }
  async setHealed() {
    return await this.userRessource.setHealed(this.uuidService.getUserID(), await this.uuidService.getDeviceId());
  }
}
