import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'mv-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  @Output()
  userCreated = new EventEmitter<boolean>();

  constructor(private connexionService: UserService) {}

  async createUser() {
    await this.connexionService.createUser();
    this.userCreated.emit(true);
  }

}
