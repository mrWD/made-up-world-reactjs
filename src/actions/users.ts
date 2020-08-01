import { Dispatch } from 'redux';
import axios from 'axios';

import * as reqestConstants from '../constants/requestStatus';
import * as authConstants from '../constants/auth';
import * as usersConstants from '../constants/users';

interface GetUserListBody {
  page?: number;
  perPage?: number;
  login?: string;
  sortBy?: string;
}

export const getUserInfo = (login: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: reqestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/user-info`, { login });

      dispatch({
        type: usersConstants.GET_USER_INFO, 
        payload: data.user,
      });

      dispatch({
        type: usersConstants.GET_IMAGE_DESTINATION,
        payload: data.destination,
      });
    } catch (err) {
      dispatch({
        type: reqestConstants.ADD_ERROR,
        payload: 'Problems with grabbing the page!',
      });
    } finally {
      dispatch({ type: reqestConstants.DECR_REQUEST_COUNT });
    }
  };
};

export const getUserList = (body: GetUserListBody) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: reqestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/all`, body);

      dispatch({
        type: usersConstants.GET_USER_LIST, 
        payload: data.userList,
      });

      dispatch({
        type: usersConstants.GET_PAGE_NUMBER,
        payload: data.page,
      });

      dispatch({
        type: usersConstants.GET_PAGE_COUNT,
        payload: data.pages,
      });

      dispatch({
        type: usersConstants.GET_IMAGE_DESTINATION,
        payload: `${process.env.REACT_APP_API_URL}/${data.destination}`,
      });
    } catch (err) {
      dispatch({
        type: reqestConstants.ADD_ERROR,
        payload: 'Problems with grabbing the page!',
      });
    } finally {
      dispatch({ type: reqestConstants.DECR_REQUEST_COUNT });
    }
  };
};

export const follow = (login: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  if (!token) return;

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: reqestConstants.INCR_REQUEST_COUNT });

      await axios.post(`${process.env.REACT_APP_API_URL}/users/follow`, { login }, {
        headers: { Authorization: token },
      });
    } catch (err) {
      dispatch({
        type: reqestConstants.ADD_ERROR,
        payload: 'Problems with grabbing the page!',
      });
    } finally {
      dispatch({ type: reqestConstants.DECR_REQUEST_COUNT });
    }
  };
};

export const unfollow = (login: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  if (!token) return;

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: reqestConstants.INCR_REQUEST_COUNT });

      await axios.post(`${process.env.REACT_APP_API_URL}/users/unfollow`, { login }, {
        headers: { Authorization: token },
      });
    } catch (err) {
      dispatch({
        type: reqestConstants.ADD_ERROR,
        payload: 'Problems with grabbing the page!',
      });
    } finally {
      dispatch({ type: reqestConstants.DECR_REQUEST_COUNT });
    }
  };
};
