import { Dispatch } from 'redux';
import axios from 'axios';

import * as authConstants from '../constants/auth';
import * as requestConstants from '../constants/requestStatus';

interface SignInBody {
  login: string;
  password: string;
}

interface SignUpBody extends SignInBody {
  passwordConfirm: string;
}

export const getAuthInfo = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authConstants.TOKEN);
  
    if (!token) return;

    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
        headers: { Authorization: token },
      });

      dispatch({
        type: authConstants.GET_TOKEN,
        payload: token,
      });

      dispatch({
        type: authConstants.GET_AUTH_INFO,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: requestConstants.ADD_ERROR,
        payload: 'Problems with grabbing the page!',
      });
    } finally {
      dispatch({ type: requestConstants.DECR_REQUEST_COUNT });
    }
  };
};

export const signUp = (body: SignUpBody) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body);

    if (data.token) {
      localStorage.setItem(authConstants.TOKEN, data.token);

      getAuthInfo();
    }
  } catch (err) {
    dispatch({
      type: requestConstants.ADD_ERROR,
      payload: 'Problems with grabbing the page!',
    });
  } finally {
    dispatch({ type: requestConstants.DECR_REQUEST_COUNT });
  }
};

export const signIn = (body: SignInBody) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, body);

    if (data.token) {
      localStorage.setItem(authConstants.TOKEN, data.token);

      getAuthInfo();
    }
  } catch (err) {
    dispatch({
      type: requestConstants.ADD_ERROR,
      payload: 'Problems with grabbing the page!',
    });
  } finally {
    dispatch({ type: requestConstants.DECR_REQUEST_COUNT });
  }
};

export const signOut = () =>  async (dispatch: Dispatch) => {
  dispatch({
    type: authConstants.GET_TOKEN,
    payload: null,
  });
  dispatch({
    type: authConstants.GET_AUTH_INFO,
    payload: null,
  });

  localStorage.removeItem(authConstants.TOKEN);
};
