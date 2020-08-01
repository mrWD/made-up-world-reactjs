import * as authConstants from '../constants/auth';
import * as storeHelper from '../helpers/storeHelper';

interface AuthInfo {
  login: string;
}

export interface AuthState {
  token: string | null;
  authInfo: AuthInfo | null;
}

const initialState: AuthState = {
  token: localStorage.getItem(authConstants.TOKEN),
  authInfo: null,
};

const handlers = {
  [authConstants.GET_TOKEN]: storeHelper
    .changeState<AuthState, typeof authConstants.GET_TOKEN>('token'),
  
  [authConstants.GET_AUTH_INFO]: storeHelper
    .changeState<AuthState, typeof authConstants.GET_AUTH_INFO>('authInfo'),
};

export const auth = storeHelper
  .reducerFactory<AuthState, typeof handlers>(initialState, handlers);
