import {
  ADD_TRACKER,
  DELETE_TRACKER,
  RESUME_TRACKER,
  STOP_TRACKER,
  SAVE_TIME_TRACKER,
} from './redux/constants';

export interface ITracker {
  id: number;
  name: string;
  time: number;
  isTicking: boolean;
}

interface IAddTrackerAction {
  type: typeof ADD_TRACKER;
  payload: {
    name: string;
  };
}

interface IStopTrackerAction {
  type: typeof STOP_TRACKER;
  payload: {
    time: number;
    id: number;
  };
}

interface IResumeTrackerAction {
  type: typeof RESUME_TRACKER;
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
  };
}

export type TrackerActionType =
  | IAddTrackerAction
  | IStopTrackerAction
  | IResumeTrackerAction
  | IDeleteTrackerAction
  | ISaveTimeAction;
