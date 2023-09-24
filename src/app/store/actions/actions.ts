import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export const createUser = createAction(
  '[User Registration] Submit user profile',
  props<{ user: User }>
);

export const getUser = createAction('[User Profile] Request for user profile');

export const userRequestSuccess = createAction(
  '[UserService getUser() API call] Get the user profile',
  props<{ user: User }>()
);
