import { applyMiddleware, createStore, compose } from 'redux';
import { save } from 'redux-localstorage-simple';
import rootReducer from './rootReducer';

export const store = createStore(
  rootReducer,
  applyMiddleware(save({ namespace: 'tracker' })),
);
