import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUserRegistration } from '../store/selectors/selectors';
import { map } from 'rxjs';
import * as UserActions from '../store/actions/actions';

export const authGuardGuard: CanActivateFn = () => {
  const store = inject(Store);

  const registration$ = store.pipe(select(selectUserRegistration));

  return registration$.pipe(
    map((result) => {
      if (!result.success) {
        store.dispatch(UserActions.navigateToRegistration());
      }

      return result.success;
    })
  );
};
