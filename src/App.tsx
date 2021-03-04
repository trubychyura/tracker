import React, { FC } from 'react';

import { connect } from 'react-redux';
import Form from './components/Form';
import Tracker from './components/Tracker';
import { ITracker } from './types';
import {
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
} from './redux/actionCreator';
import { TrackerActionType } from './types';

interface RootState {
  trackers: ITracker[];
}

interface AppProps {
  trackers: ITracker[];
  addTracker: (name: string) => TrackerActionType;
  deleteTracker: (id: number) => TrackerActionType;
  toggleTracker: (id: number) => TrackerActionType;
  saveTime: (time: number, id: number) => TrackerActionType;
}

const App: FC<AppProps> = ({
  trackers,
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
}) => {
  return (
    <div className='App'>
      <h1>Tracker</h1>
      <Form addTracker={addTracker} />
      <hr />
      {trackers.map((tracker: any) => {
        return (
          <Tracker
            key={tracker.id}
            settings={tracker}
            remove={deleteTracker}
            toggle={toggleTracker}
            saveTime={saveTime}
          />
        );
      })}
    </div>
  );
};

export default connect((state: RootState) => ({ trackers: state.trackers }), {
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
})(App);
