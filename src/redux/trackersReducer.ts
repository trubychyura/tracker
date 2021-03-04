import {
  ADD_TRACKER,
  DELETE_TRACKER,
  RESUME_TRACKER,
  STOP_TRACKER,
} from './constants';

const initialState = [
  { id: 0, name: 'first tracker', time: 0, isTicking: true },
];

const trackerReducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TRACKER:
      let newTracker = {
        id: state.length + 1,
        name: payload.name || `No name tracker #${state.length + 1}`,
      };
      return [...state, newTracker];
    case STOP_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === payload.id) {
          return { ...tracker, isTicking: false, time: payload.time };
        }
        return tracker;
      });
    case RESUME_TRACKER:
      return [...state].map((tracker) => {
        if (tracker.id === payload.id) {
          return { ...tracker, isTicking: true };
        }
        return tracker;
      });
    case DELETE_TRACKER:
      return [...state].filter((tracker) => tracker.id !== payload.id);
    default:
      return state;
  }
};

export default trackerReducer;
