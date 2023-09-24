import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import * as UserActions from '../actions/actions';

export interface UserState {
  user?: User;
  error: boolean;
}

export const initialState: UserState = {
  error: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userRequestSuccess, (status, action) => ({
    ...status,
    user: action.user,
  }))
);
