import { Dispatch } from 'redux';
import axios from 'axios';

import * as requestConstants from '../constants/requestStatus';
import * as authConstants from '../constants/auth';
import * as storiesConstants from '../constants/stories';

interface SavePageBody {
  title: string;
  body: string;
  options: string[];
}

export const removePage = (storyURL: string) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authConstants.TOKEN);
  
    if (!token) return;
  
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/editing/remove-page`,
        { storyURL },
        { headers: { Authorization: token } },
      );

      dispatch({
        type: storiesConstants.GET_ALL_PAGES,
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

export const savePage = (body: SavePageBody, callback: Function) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authConstants.TOKEN);
  
    if (!token) return;
  
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/editing/save`, body, {
        headers: { Authorization: token },
      });

      dispatch({
        type: storiesConstants.GET_ALL_PAGES,
        payload: data,
      });

      if (data[0] && callback) {
        callback(data[0].storyURL);
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
};
