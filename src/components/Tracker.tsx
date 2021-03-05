import { FC, useEffect, useState } from 'react';
import { ITracker, TrackerActionType } from '../types';
import { convertTime } from '../helper';

interface TrackerProps {
  remove: (id: number) => TrackerActionType;
  toggle: (id: number) => TrackerActionType;
  saveTime: (
    time: number,
    id: number,
    closedTime: number | null,
  ) => TrackerActionType;
  settings: ITracker;
}

const Tracker: FC<TrackerProps> = ({ settings, remove, toggle, saveTime }) => {
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
    const closedTime: number | null = isTicking ? Date.now() : null;
    saveTime(localTime, id, closedTime);
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
      <span> {name}</span>
      <span>Time: {convertTime(localTime)}</span>
      <button onClick={() => toggle(id)}>
        {isTicking ? 'stop' : 'resume'}
      </button>
      <button onClick={() => remove(id)}>delete</button>
    </div>
  );
};

export default Tracker;
