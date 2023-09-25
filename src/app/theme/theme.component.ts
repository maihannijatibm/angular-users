import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../app.constants';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  currentLang = this.translateService.currentLang;

  constructor(private readonly translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
    });
  }

  switchLanguage(): void {
    if (this.translateService.currentLang === APP_CONSTANTS.LANGUAGES.en) {
      this.translateService.use(APP_CONSTANTS.LANGUAGES.fr);
    } else {
      this.translateService.use(APP_CONSTANTS.LANGUAGES.en);
    }
  }
}
