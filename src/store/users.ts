import * as usersConstants from '../constants/users';
import * as storeHelper from '../helpers/storeHelper';

interface User {
  id: string;
  login: string;
  photo: string;
  followers: { login: string }[];
  followings: { login: string }[];
}

export interface UsersState {
  pageNumber: number;
  pageCount: number;
  destination: string;
  userInfo: User | null;
  userList: User[] | null;
}

const initialState: UsersState = {
  pageNumber: 1,
  pageCount: 0,
  destination: '',
  userInfo: null,
  userList: null,
};

const handlers = {
  [usersConstants.GET_PAGE_NUMBER]: storeHelper
    .changeState<UsersState, typeof usersConstants.GET_PAGE_NUMBER>('pageNumber'),
  
  [usersConstants.GET_PAGE_COUNT]: storeHelper
    .changeState<UsersState, typeof usersConstants.GET_PAGE_COUNT>('pageCount'),
  
  [usersConstants.GET_USER_INFO]: storeHelper
    .changeState<UsersState, typeof usersConstants.GET_USER_INFO>('userInfo'),
  
  [usersConstants.GET_USER_LIST]: storeHelper
    .changeState<UsersState, typeof usersConstants.GET_USER_LIST>('userList'),
  
  [usersConstants.GET_IMAGE_DESTINATION]: storeHelper
    .changeState<UsersState, typeof usersConstants.GET_IMAGE_DESTINATION>('destination'),
};

export const users = storeHelper
  .reducerFactory<UsersState, typeof handlers>(initialState, handlers);
