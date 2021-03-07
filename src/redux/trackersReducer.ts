import { load } from 'redux-localstorage-simple';
import { setRightTrackerTime } from '../helper';
import { ITracker, TrackerActionType } from '../types';
import {
  ADD_TRACKER,
  DELETE_TRACKER,
  SAVE_TIME_TRACKER,
  TOGGLE_TRACKER,
} from './constants';

const savedStore: any = load({ namespace: 'tracker' });

const initialState: Array<ITracker> =
  savedStore && savedStore.trackers
    ? setRightTrackerTime(savedStore.trackers)
    : [];

const trackersReducer = (
  state = initialState,
  action: TrackerActionType,
): ITracker[] => {
  switch (action.type) {
    case ADD_TRACKER:
      let newTracker = {
        id: state.length ? state.length : 0,
        name:
          action.payload.name ||
          `No name tracker #${state.length ? state.length + 1 : 1}`,
        isTicking: true,
        time: 0,
      };
      return [...state, newTracker];
    case TOGGLE_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === action.payload.id) {
          return { ...tracker, isTicking: !tracker.isTicking };
        }
        return tracker;
      });
    case DELETE_TRACKER:
      return [...state].filter((tracker) => tracker.id !== action.payload.id);
    case SAVE_TIME_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            ...tracker,
            time: action.payload.time,
            closedTime: action.payload.closedTime,
          };
        }
        return tracker;
      });
    default:
      return state;
  }
};

export default trackersReducer;
