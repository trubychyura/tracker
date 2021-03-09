import {
  ADD_TRACKER,
  DELETE_TRACKER,
  TOGGLE_TRACKER,
  SAVE_TIME_TRACKER,
} from './redux/constants';

export interface ITracker {
  id: number;
  name: string;
  time: number;
  closedTime?: number | null;
  isTicking: boolean;
}

interface IAddTrackerAction {
  type: typeof ADD_TRACKER;
  payload: {
    name: string;
  };
}

interface IToggleTrackerAction {
  type: typeof TOGGLE_TRACKER;
  payload: {
    id: number;
  };
}

interface IDeleteTrackerAction {
  type: typeof DELETE_TRACKER;
  payload: {
    id: number;
  };
}

interface ISaveTimeAction {
  type: typeof SAVE_TIME_TRACKER;
  payload: {
    id: number;
    time: number;
    closedTime: number | null;
  };
}

export type TrackerActionType =
  | IAddTrackerAction
  | IDeleteTrackerAction
  | IToggleTrackerAction
  | ISaveTimeAction;
