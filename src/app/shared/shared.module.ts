import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [DirectivesModule],
  exports: [DirectivesModule]
})
export class SharedModule {}
