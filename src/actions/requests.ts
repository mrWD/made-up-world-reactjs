import { Dispatch } from 'redux';
import * as requestConstants from '../constants/requestStatus';

export const removeError = (error: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: requestConstants.REMOVE_ERROR,
      payload: error,
    })
  };
};
