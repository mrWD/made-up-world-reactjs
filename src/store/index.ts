import { combineReducers } from 'redux';

import { auth, AuthState } from './auth';
import { stories, StoriesState } from './stories';
import { users, UsersState } from './users';

import { requestStatus, RequestState } from './requestStatus';

export interface Store {
  auth: AuthState;
  stories: StoriesState;
  users: UsersState;

  requestStatus: RequestState;
}

export const store = combineReducers({
  auth,
  stories,
  users,

  requestStatus,
});
