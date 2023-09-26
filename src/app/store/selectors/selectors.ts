import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

/**
 * pass user registration state only from UserState
 */
export const selectUserRegistration = createSelector(
  selectUserState,
  (state: UserState) => state.registration
);