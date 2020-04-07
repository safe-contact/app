import { NgModule } from '@angular/core';
import { NgLetModule } from './ng-let/ng-let.module';

@NgModule({
  imports: [NgLetModule],
  exports: [NgLetModule]
})
export class DirectivesModule {}
