import { FC, useEffect, useState } from 'react';
import { ITracker, TrackerActionType } from '../types';

interface TrackerProps {
  stop: (id: number, time: number) => TrackerActionType;
  resume: (id: number) => TrackerActionType;
  remove: (id: number) => TrackerActionType;
  saveTime: (time: number, id: number) => TrackerActionType;
  settings: ITracker;
}

const Tracker: FC<TrackerProps> = ({
  settings,
  stop,
  resume,
  remove,
  saveTime,
}) => {
  const { name, id, isTicking, time } = settings;

  const [localTime, setTime] = useState(time);

  useEffect(() => {
    if (!isTicking) return;

    let timer: ReturnType<typeof setInterval>;
    timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isTicking]);

  const beforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    saveTime(localTime, id);

    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [beforeUnload]);

  return (
    <div>
      <span>Name: {name}</span>
      <span>Time: {localTime}</span>
      {isTicking ? (
        <button onClick={() => stop(id, localTime)}>Stop</button>
      ) : (
        <button onClick={() => resume(id)}>Resume</button>
      )}
      <button onClick={() => remove(id)}>Delete</button>
    </div>
  );
};

export default Tracker;
