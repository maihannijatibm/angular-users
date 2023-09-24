import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { concatMap, map } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import * as UserActions from '../actions/actions';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      concatMap(() => this.userService.get()),
      map((user: User) => UserActions.userRequestSuccess({ user }))
    )
  );
}
