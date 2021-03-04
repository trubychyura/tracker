import {
  ADD_TRACKER,
  DELETE_TRACKER,
  RESUME_TRACKER,
  STOP_TRACKER,
} from './constants';
import { ITracker, TrackerActionType } from '../types';
import { load } from 'redux-localstorage-simple';

const savedStore: any = load({ namespace: 'tracker' });
const initialState: Array<ITracker> =
  savedStore && savedStore.trackers ? savedStore.trackers : [];

console.log(initialState, 'trackers');
const trackersReducer = (
  state = initialState,
  action: TrackerActionType,
): ITracker[] => {
  switch (action.type) {
    case ADD_TRACKER:
      let newTracker = {
        id: state.length + 1,
        name: action.payload.name || `No name tracker #${state.length + 1}`,
        isTicking: true,
        time: 0,
      };
      return [...state, newTracker];
    case STOP_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === action.payload.id) {
          return { ...tracker, isTicking: false };
        }
        return tracker;
      });
    case RESUME_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === action.payload.id) {
          return { ...tracker, isTicking: true };
        }
        return tracker;
      });
    case DELETE_TRACKER:
      return [...state].filter((tracker) => tracker.id !== action.payload.id);
    default:
      return state;
  }
};

export default trackersReducer;
