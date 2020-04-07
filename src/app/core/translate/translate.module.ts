import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { LangueService } from './langue.service';

@NgModule({
  imports: [
    NgxTranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useClass: LangueService
      }
    }),
  ],
  exports: [
    NgxTranslateModule
  ]
})
export class TranslateModule {}
