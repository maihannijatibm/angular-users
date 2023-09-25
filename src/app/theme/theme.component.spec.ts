import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeComponent } from './theme.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ThemeComponent],
      providers: [TranslateService],
    });
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language from en to fr with switchLanguage call', () => {
    translateService.use('en-CA');

    component.switchLanguage();

    expect(translateService.currentLang).toEqual('fr-CA');
  });

  it('should switch language from fr to en with switchLanguage call', () => {
    translateService.use('fr-CA');

    component.switchLanguage();

    expect(translateService.currentLang).toEqual('en-CA');
  });
});
