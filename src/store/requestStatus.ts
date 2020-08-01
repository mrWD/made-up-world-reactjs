import * as requestConstants from '../constants/requestStatus';
import * as storeHelper from '../helpers/storeHelper';

export interface RequestState {
  isLoading: boolean;
  requestCount: number;
  errors: string[];
}

const MIN_LOADER_REQ_COUNT = 0;

const initialState: RequestState = {
  isLoading: false,
  requestCount: 0,
  errors: [],
};

const handlers = {
  [requestConstants.INCR_REQUEST_COUNT]: (state: RequestState) => ({
    ...state,
    isLoading: true,
    requestCount: ++state.requestCount,
  }),

  [requestConstants.DECR_REQUEST_COUNT]: (state: RequestState) => ({
    ...state,
    isLoading: state.requestCount - 1 > MIN_LOADER_REQ_COUNT,
    requestCount: state.requestCount - 1,
  }),

  [requestConstants.ADD_ERROR]: (state: RequestState, { payload }: { payload: string }) => {
    const errorsSet = new Set(state.errors);

    errorsSet.add(payload);

    return {
      ...state,
      errors: Array.from(errorsSet),
    };
  },

  [requestConstants.REMOVE_ERROR]: (state: RequestState, { payload }: { payload: string }) => ({
    ...state,
    errors: state.errors.filter((item) => item !== payload),
  }),
};

export const requestStatus = storeHelper.reducerFactory(initialState, handlers);
