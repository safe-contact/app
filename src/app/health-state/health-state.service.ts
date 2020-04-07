import { Injectable } from '@angular/core';
import { UserService } from '../home/user.service';
import { Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({providedIn: 'root'})
export class HealthStateService {
  healthState$ = new Subject<any>();

  pollInterval = 60 * 60 * 1000;

  constructor(private userService: UserService,
              private localNotifications: LocalNotifications) {
    this.pollHealthState();
    this.showNotifications();
  }

  showNotifications() {
    this.healthState$.pipe(
      filter(healthState => !!healthState && !!healthState.message),
      map(healthState => healthState.message),
      distinctUntilChanged())
      .subscribe(notifMessage => this.localNotifications.schedule({
        text: notifMessage
      }));
  }

  pollHealthState() {
    timer(0, this.pollInterval).subscribe(() => this.getHealthState());
  }

  async getHealthState() {
    const healthState = await this.userService.getUserHealthState();

    if (healthState) {
      this.healthState$.next(healthState);
    }
  }

  async setSick(confirmed: boolean) {
    await this.userService.setSick(confirmed);
    const healthState = await this.userService.getUserHealthState();
    this.healthState$.next(healthState);
  }

  async setHealed() {
    await this.userService.setHealed();
    const healthState = await this.userService.getUserHealthState();
    this.healthState$.next(healthState);
  }
}
