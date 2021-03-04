import {
  ADD_TRACKER,
  DELETE_TRACKER,
  RESUME_TRACKER,
  STOP_TRACKER,
} from './constants';
import { ITracker, TrackerActionType } from '../types';

const initialState: Array<ITracker> = [
  { id: 0, name: 'first tracker', time: 0, isTicking: true },
];

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
          return { ...tracker, isTicking: false, time: action.payload.time };
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
