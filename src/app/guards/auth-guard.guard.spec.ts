import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuardGuard } from './auth-guard.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserState } from '../store/reducers/reducer';
import * as UserActions from '../store/actions/actions';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuardGuard(...guardParameters));

  let mockStore: MockStore<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot()],
      providers: [
        provideMockStore({
          initialState: {
            user: undefined,
            registration: {
              success: true,
              error: false,
            },
          },
        }),
      ],
    });

    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if registration is successful', () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    mockStore.dispatch(UserActions.userRegistrationSuccess({ success: true }));

    const storeSpy = spyOn(mockStore, 'pipe').and.returnValue(of(true));

    executeGuard(route, state);

    expect(storeSpy).toHaveBeenCalled();
  });
});
