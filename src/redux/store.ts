import { applyMiddleware, createStore, compose } from 'redux';
import { save } from 'redux-localstorage-simple';
import rootReducer from './rootReducer';

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(save({ namespace: 'tracker' })),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
