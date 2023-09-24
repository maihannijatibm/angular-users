import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { catchError, concatMap, map, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import * as UserActions from '../actions/actions';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
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
}
