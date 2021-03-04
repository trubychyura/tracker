import { ADD_TRACKER } from './constants';

export const addTracker = (name: string | undefined) => ({
  type: ADD_TRACKER,
  payload: {
    name,
  },
});

export const stopTracker = (time: number, id: number) => ({
  type: ADD_TRACKER,
  payload: {
    time,
    id,
  },
});

export const resumeTracker = (id: number) => ({
  type: ADD_TRACKER,
  payload: {
    id,
  },
});

export const deleteTracker = (id: number) => ({
  type: ADD_TRACKER,
  payload: {
    id,
  },
});
