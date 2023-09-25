import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserState } from '../store/reducers/reducer';
import * as UserActions from '../store/actions/actions';
import { APP_CONSTANTS } from '../app.constants';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockStore: MockStore<UserState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(),
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [RegistrationComponent],
      providers: [
        provideMockStore({
          initialState: {
            user: undefined,
            registration: {
              success: false,
              error: false,
            },
          },
        }),
      ],
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error to true if user registration fails', () => {
    const registrationResult = {
      success: false,
      error: true,
    };

    component.registration$ = of(registrationResult);

    component.ngOnInit();

    expect(component.error).toBeTrue();
  });

  it('should navigate to profile page if registration successful', () => {
    const registrationResult = {
      success: true,
      error: false,
    };

    component.registration$ = of(registrationResult);

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['profile']);
  });

  it('should dispatch createUser onFormSubmit', () => {
    const user = {
      name: 'Bob',
      password: 'xy',
      email: 'xy@example.com',
      bio: 'Hello world!',
    };

    const getCallSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    component.createForm();

    component.form?.get('name')?.setValue(user.name);
    component.form?.get('password')?.setValue(user.password);
    component.form?.get('email')?.setValue(user.email);
    component.form?.get('bio')?.setValue(user.bio);

    component.onFormSubmit();

    expect(getCallSpy).toHaveBeenCalledWith(UserActions.createUser({ user }));
  });
});
