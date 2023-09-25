import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import * as UserActions from '../actions/actions';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/app.constants';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap((action) => this.userService.create(action.user)),
      map((result: { success: true }) => {
        if (result.success) {
          return UserActions.userRegistrationSuccess({ success: true });
        } else {
          return UserActions.userRegistrationFailed({ error: true });
        }
      }),
      catchError(() => of(UserActions.userRegistrationFailed({ error: true })))
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      concatMap(() => this.userService.get()),
      map((user: User) => UserActions.userRequestSuccess({ user }))
    )
  );

  navigateUserRegistration$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.navigateToRegistration),
        tap(() => this.router.navigate([APP_CONSTANTS.ROUTES.registration]))
      ),
    { dispatch: false }
  );
}
