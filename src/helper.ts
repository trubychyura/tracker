import { ITracker } from './types';

export const convertTime = (seconds: number): string => {
  var hr = Math.floor(seconds / 3600);
  var min = Math.floor(seconds / 60) % 60;
  var sec = seconds % 60;

  return [hr, min, sec].map((v) => (v < 10 ? '0' + v : v)).join(':');
};

export const setRightTrackerTime = (trackers: ITracker[]): ITracker[] => {
  return trackers.map((tracker: any) => {
    const { closedTime, ...restProps } = tracker;
    if (closedTime) {
      const newTime =
        Math.floor((Date.now() - closedTime) / 1000) + tracker.time;
      return { ...restProps, time: newTime };
    }
    return tracker;
  });
};
