import { FC, MouseEvent, useEffect, useState } from 'react';
import { ITracker, TrackerActionType } from '../types';

interface TrackerProps {
  stop: (id: number, time: number) => TrackerActionType;
  resume: (id: number) => TrackerActionType;
  remove: (id: number) => TrackerActionType;
  settings: ITracker;
}

const Tracker: FC<TrackerProps> = ({ settings, stop, resume, remove }) => {
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

  useEffect(() => {
    (window as any).addEventListener('beforeunload', () => {
      const answer = window.confirm('Do you really want to close Tracker?');
      console.log('closing tab', answer);
    });
  });

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
