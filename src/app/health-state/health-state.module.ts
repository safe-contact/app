import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { HealthStateComponent } from './health-state.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [HealthStateComponent],
  exports: [HealthStateComponent]
})
export class HealthStateModule {}
