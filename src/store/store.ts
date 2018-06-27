import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { items } from './items';

export const store = createStore(
  combineReducers({ items }),
  applyMiddleware(thunk)
);
