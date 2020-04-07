import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { lowerCase } from 'lodash';
import { TRANSLATIONS } from './i18n/translations';

@Injectable({providedIn: 'root'})
export class LangueService implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const translations = TRANSLATIONS[lowerCase(lang)] || {};
    return of(translations);
  }
}
