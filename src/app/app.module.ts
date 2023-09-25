import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ThemeComponent } from './theme/theme.component';
import { userReducer } from './store/reducers/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/effects';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent, ThemeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
