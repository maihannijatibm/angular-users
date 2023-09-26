import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    // set language on first launch
    this.translateService.use(APP_CONSTANTS.LANGUAGES.en);
  }
}
