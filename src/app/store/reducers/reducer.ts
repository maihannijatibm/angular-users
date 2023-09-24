import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import * as UserActions from '../actions/actions';

export interface UserState {
  user?: User;
  registration: { success: boolean; error: boolean };
}

export const initialState: UserState = {
  registration: {
    success: false,
    error: false,
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userRequestSuccess, (status, action) => ({
    ...status,
    user: action.user,
  })),
  on(UserActions.userRegistrationSuccess, (status, action) => ({
    ...status,
    registration: { success: action.success, error: false },
  })),
  on(UserActions.userRegistrationFailed, (status, action) => ({
    ...status,
    registration: { success: false, error: action.error },
  }))
);
