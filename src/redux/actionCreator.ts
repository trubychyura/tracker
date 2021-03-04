import {
  ADD_TRACKER,
  DELETE_TRACKER,
  RESUME_TRACKER,
  STOP_TRACKER,
} from './constants';
import {
  TrackerActionType
} from './../types';


export const addTracker = (name: string): TrackerActionType => ({
  type: ADD_TRACKER,
  payload: {
    name,
  },
});

export const stopTracker = (time: number, id: number): TrackerActionType => ({
  type: STOP_TRACKER,
  payload: {
    time,
    id,
  },
});

export const resumeTracker = (id: number): TrackerActionType => ({
  type: RESUME_TRACKER,
  payload: {
    id,
  },
});

export const deleteTracker = (id: number): TrackerActionType => ({
  type: DELETE_TRACKER,
  payload: {
    id,
  },
});
