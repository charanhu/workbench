
import {take} from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable ,  Subscription ,  BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class TranslationsService implements OnDestroy {

  private i18n: Subscription;
  private i18nSub: BehaviorSubject<any> = new BehaviorSubject(null);
  i18nObs: Observable<any> = this.i18nSub.asObservable();

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnDestroy () {
    if (this.i18n) {
      this.i18n.unsubscribe();
    }
  }

  public init (): void {
    this.i18n = this.translateService.onLangChange.subscribe(l => {
      if (!l || !l.lang) { return; }

      this.translateService.getTranslation(l.lang).pipe(
        take(1))
        .subscribe(t => this.i18nSub.next(t));
    });
    this.translateService.addLangs(environment.config.localisation.langs);
    this.translateService.use(environment.config.localisation.default);

    const browserLang = this.translateService.getBrowserLang();
    const langRegExp = new RegExp(environment.config.localisation.langs.join('|'), 'gi');
    this.translateService.use(browserLang.match(langRegExp) ? browserLang : environment.config.localisation.default);
  }
}
