import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export const createUser = createAction(
  '[User Registration API call] Submit user profile',
  props<{ user: User }>()
);

export const userRegistrationSuccess = createAction(
  '[User Registration API call] Set registration state success',
  props<{ success: boolean }>()
);

export const userRegistrationFailed = createAction(
  '[UserService Get User API call] Set registration state error',
  props<{ error: boolean }>()
);

export const getUser = createAction('[User Profile] Request for user profile');

export const userRequestSuccess = createAction(
  '[UserService getUser() API call] Get the user profile',
  props<{ user: User }>()
);

export const navigateToRegistration = createAction(
  '[AuthGuard] Navigate to user registration'
);
