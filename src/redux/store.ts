import { createStore } from 'redux';
import trackerReducer from './trackersReducer';

export const store = createStore(trackerReducer);
