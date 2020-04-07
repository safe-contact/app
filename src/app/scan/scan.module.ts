import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { ScanComponent } from './scan.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [ScanComponent],
  exports: [ScanComponent]
})
export class ScanModule {}
