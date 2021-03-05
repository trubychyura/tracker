import {
  ADD_TRACKER,
  DELETE_TRACKER,
  SAVE_TIME_TRACKER,
  TOGGLE_TRACKER,
} from './constants';
import { TrackerActionType } from './../types';

export const addTracker = (name: string): TrackerActionType => ({
  type: ADD_TRACKER,
  payload: {
    name,
  },
});

export const toggleTracker = (id: number): TrackerActionType => ({
  type: TOGGLE_TRACKER,
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

export const saveTime = (
  time: number,
  id: number,
  closedTime: number | null,
): TrackerActionType => ({
  type: SAVE_TIME_TRACKER,
  payload: {
    id,
    time,
    closedTime,
  },
});
