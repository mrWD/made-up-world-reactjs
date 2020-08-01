import { Dispatch } from 'redux';
import axios from 'axios';

import * as authConstants from '../constants/auth';
import * as storiesConstants from '../constants/stories';
import * as requestConstants from '../constants/requestStatus';

interface GetStoryListBody {
  page?: string;
  perPage?: string;
  title?: string;
  owner?: string;
  sortBy?: string;
}

interface SaveStoryBody {
  changes: Array<{
    id: string;
    nextPages: string[];
    isFirst?: boolean;
  }>;
}

export const getStoryList = (body?: GetStoryListBody) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authConstants.TOKEN);

    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });
  
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/reading/all`, body, {
        headers: { ...(token && { Authorization: token }) },
      });

      dispatch({
        type: storiesConstants.GET_STORY_LIST,
        payload: data.storyList,
      });

      dispatch({
        type: storiesConstants.GET_PAGE_NUMBER,
        payload: data.page,
      });

      dispatch({
        type: storiesConstants.GET_PAGE_COUNT,
        payload: data.pages,
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

export const getStory = (body: { storyURL: string; pageId: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });
  
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/reading/page`, body);

      dispatch({
        type: storiesConstants.GET_STORY,
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

export const getAllPages = (storyURL: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/editing/all`, { storyURL }, {
        headers: { Authorization: token },
      });

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

export const saveStory = (body: SaveStoryBody) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/editing/save-story`, body, {
        headers: { Authorization: token },
      });

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

export const removeStory = (storyURL: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/editing/remove-story`, storyURL, {
        headers: { Authorization: token },
      });

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

export const publishStory = (storyURL: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      await axios.post(`${process.env.REACT_APP_API_URL}/editing/publish`, { storyURL }, {
        headers: { Authorization: token },
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

export const unpublishStory = (storyURL: string) => {
  const token = localStorage.getItem(authConstants.TOKEN);

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: requestConstants.INCR_REQUEST_COUNT });

      await axios.post(`${process.env.REACT_APP_API_URL}/editing/unpublish`, { storyURL }, {
        headers: { Authorization: token },
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

export const clearList = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: storiesConstants.GET_ALL_PAGES,
      payload: [],
    });
  };
}
