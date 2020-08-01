import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { store } from './store';

export const configureStore = (initialState?: any) => {
  return createStore(
    store,
    initialState,
    applyMiddleware(thunk, logger),
  );
};
